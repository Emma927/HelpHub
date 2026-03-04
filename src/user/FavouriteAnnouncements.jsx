import { useEffect, useState, useRef } from 'react';
import { useUser } from '@/contexts/userContext/useUser';
import { useAnnouncements } from '@/contexts/announcementsContext/useAnnouncements';
import AnnouncementCard from '@/components/AnnouncementCard';
import PaginationComponent from '@/components/PaginationComponent';
import { parseFavsFromLocalStorage } from '@/utils/parseFavsFromLocalStorage';
import { useSearchParams } from 'react-router-dom';

/**
 * Displays the user's favorite announcements with pagination.
 * Synchronizes the internal state with the URL search parameters.
 */
function FavouriteAnnouncements() {
  const { user } = useUser();
  const { announcements } = useAnnouncements();

  // Lazy init - reads favorites from localStorage only on the first mount.
  // ProtectedRoute ensures the component remounts on user change,
  // keeping data in sync. Try/catch prevents app crashes from malformed JSON.
  const [favs, setFavs] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      if (!stored) return [];

      const parsedUser = JSON.parse(stored);
      // Optional chaining (?.) safely handles cases where parsedUser might be null
      return parsedUser?.id ? parseFavsFromLocalStorage(parsedUser.id) : [];
    } catch (error) {
      console.error('Error parsing user favs at init:', error);
      return [];
    }
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const announcementsPerPage = 12;
  const topRef = useRef(null);

  // Derive page from URL – no local useState needed for pagination
  const pageInURL = parseInt(searchParams.get('page')) || 1;

  // Filter and sort global announcements to match user favorites.
  const favAnnouncements = (announcements || [])
    .filter((a) => favs.includes(a.id))
    .sort((a, b) => favs.indexOf(b.id) - favs.indexOf(a.id));

  const totalPages = Math.ceil(favAnnouncements.length / announcementsPerPage);

  // Final validated page value (ensures we don't stay on a non-existent page)
  const currentPage =
    pageInURL > totalPages && totalPages > 0 ? totalPages : pageInURL;

  // Corrects the URL if the page parameter exceeds available pages
  // uses { replace: true } for silent correction without polluting history.
  useEffect(() => {
    if (pageInURL > totalPages && totalPages > 0) {
      setSearchParams({ page: totalPages }, { replace: true });
    }
  }, [pageInURL, totalPages, setSearchParams]);

  // Smooth scroll to top on page change.
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // Pagination slicing logic
  const indexOfLast = currentPage * announcementsPerPage;
  const indexOfFirst = indexOfLast - announcementsPerPage;
  const currentFavs = favAnnouncements.slice(indexOfFirst, indexOfLast);

  // Updates local state when favorites change
  const updateFavs = () => {
    if (user?.id) setFavs(parseFavsFromLocalStorage(user.id));
  };

  const handlePageChange = (page) => {
    setSearchParams({ page }); // No { replace: true } here – this preserves the browser history for the Back button.
  };

  if (!user || !announcements) return null;

  return (
    <section className="announcements" ref={topRef}>
      <h2 className="text-primary text-center logo-font--resp mb-5">
        Twoje ulubione ogłoszenia:
      </h2>
      {currentFavs.length === 0 ? (
        <p className="logo-font--resp text-danger">
          Nie masz jeszcze ulubionych zbiórek.
        </p>
      ) : (
        <div
          className={`row g-3 ${
            currentFavs.length <= 2
              ? 'align-items-center justify-content-center'
              : 'align-items-start'
          }`}
        >
          {currentFavs.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onToggleFav={updateFavs} // Passing the update function as a callback
              currentPage={currentPage}
              listType="favourites"
            />
          ))}
        </div>
      )}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default FavouriteAnnouncements;
