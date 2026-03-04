import { useEffect, useRef, useMemo } from 'react';
import { useFilters } from '@/contexts/filtersContext/useFilters';
import { useAnnouncements } from '@/contexts/announcementsContext/useAnnouncements';
import SelectBar from '@/components/SelectBar';
import Filters from '@/components/Filters';
import AnnouncementCard from '@/components/AnnouncementCard';
import PaginationComponent from '@/components/PaginationComponent';

function Announcements() {
  const { announcements, error } = useAnnouncements();

  const {
    selectedVoivodeship,
    selectedCategories,
    resetAllFilters,
    currentPage,
    setCurrentPage,
  } = useFilters();

  const topRef = useRef(null);
  const announcementsPerPage = 12;

  // Smooth scroll to the top of the list when the page changes
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // Optimized filtering and sorting logic using useMemo
  const filteredAndSorted = useMemo(() => {
    if (!announcements) return [];

    let result = announcements.filter((announcement) => {
      const matchesVoivodeship =
        selectedVoivodeship === 'all' ||
        announcement.voivodeshipSlug === selectedVoivodeship;

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((categoryName) =>
          announcement.category.includes(categoryName),
        );

      return matchesVoivodeship && matchesCategory;
    });

    return [...result].sort(
      (a, b) => new Date(b.datePosted) - new Date(a.datePosted),
    );
  }, [announcements, selectedVoivodeship, selectedCategories]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSorted.length / announcementsPerPage);
  const indexOfLast = currentPage * announcementsPerPage;
  const indexOfFirst = indexOfLast - announcementsPerPage;
  const currentAnnouncements = filteredAndSorted.slice(
    indexOfFirst,
    indexOfLast,
  );

  // Page changes are handled via Context, which also syncs with the URL
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (error)
    return (
      <div className="text-danger logo-font--resp">Błąd ładowania danych</div>
    );

  if (!announcements)
    return (
      <div className="text-primary logo-font--resp">
        Trwa ładowanie danych...
      </div>
    );

  return (
    <section className="announcements" ref={topRef}>
      <h2 className="text-primary text-center logo-font--resp">
        Wybierz kategorię zbiórki:
      </h2>
      <div className="select-filters__container">
        <SelectBar className="flex-grow-1" />
        <Filters />
        <button
          type="button"
          className="btn--welcome announcements__filters mt-4"
          onClick={() => {
            resetAllFilters();
          }}
        >
          Wyczyść
        </button>
      </div>

      <div
        className={`row g-3 ${
          currentAnnouncements.length <= 2
            ? 'align-items-center justify-content-center'
            : 'align-items-start'
        }`}
      >
        {currentAnnouncements.length > 0 ? (
          currentAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              currentPage={currentPage}
              listType="all"
            />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="logo-font--resp">
              Brak ogłoszeń spełniających wybrane kryteria.
            </p>
          </div>
        )}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default Announcements;
