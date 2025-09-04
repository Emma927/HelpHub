import React, { useContext, useState, useEffect, useRef } from 'react';
import { FiltersContext } from '@/context/FiltersContext';
import { AnnouncementsContext } from '@/context/AnnouncementsContext';
import SelectBar from '@/components/SelectBar';
import Filters from '@/components/Filters';
import AnnouncementCard from '@/components/AnnouncementCard';
import PaginationComponent from '@/components/PaginationComponent';
import { useSearchParams } from 'react-router-dom';

/**
 * Komponent wyświetlający listę ogłoszeń z filtrowaniem, sortowaniem i paginacją.
 * - Pobiera ogłoszenia z AnnouncementsContext.
 * - Filtruje po województwie i kategoriach (FiltersContext).
 * - Sortuje po dacie dodania.
 * - Obsługuje paginację i synchronizuje numer strony z URL.
 */
function Announcements() {
  const { announcements, error } = useContext(AnnouncementsContext); // Dostęp do globalnych ogłoszeń i błędu z Context API

  const {
    selectedVoivodeship,
    setSelectedVoivodeship,
    selectedCategories,
    setSelectedCategories,
    currentPage,
    setCurrentPage,
  } = useContext(FiltersContext); // Globalny stan FiltersContext przechowuje stan filtrów na poziomie aplikacji, co oznacza, że jest on dostępny i zachowany niezależnie od tego, na której stronie aktualnie się znajduję.

  const [searchParams, setSearchParams] = useSearchParams(); // Synchronizacja strony z URL
  const topRef = useRef(null); // Referencja do góry listy ogłoszeń (<section>, scroll po zmianie strony)
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]); // Lista ogłoszeń po zastosowaniu filtrów
  const announcementsPerPage = 12;

  // Przechowuje poprzednie filtry do porównania, aby resetować paginację tylko przy zmianach filtrów
  const prevFilters = useRef({
    voivodeship: selectedVoivodeship,
    categories: [...selectedCategories],
  });

  // Smooth scroll do góry listy po zmianie strony
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  /** Funkcja porównująca dwie tablice stringów
   * Zwraca true tylko wtedy, gdy:
   * - mają tę samą długość, ponieważ .every() sprawdza tylko elementy do długości pierwszej tablicy, a jeśli druga tablica jest dłuższa → dodatkowe elementy zostaną zignorowane
   * - wszystkie elementy są identyczne w tej samej kolejności
   * - el to alias dla a[i]
   * Użycie w `filtersChanged`:
   * !arraysEqual(prevFilters.current.categories, selectedCategories)
   * - Zwraca `true`, jeśli tablice kategorii są różne (czyli filtry zostały zmienione)
   */
  function arraysEqual(a, b) {
    return a.length === b.length && a.every((el, i) => el === b[i]);
  }

  // Aktualizacja listy ogłoszeń po zmianie filtrów lub nowych ogłoszeniach
  useEffect(() => {
    if (!announcements) return; // Jeśli brak ogłoszeń, zakończ działanie
    // Sprawdzenie, czy filtry się zmieniły w porównaniu do poprzedniego stanu
    const filtersChanged =
      prevFilters.current.voivodeship !== selectedVoivodeship || // Zmiana województwa
      !arraysEqual(prevFilters.current.categories, selectedCategories); // Kategorie zostały zmienione, jeśli tablice prevFilters.current.categories i selectedCategories nie są identyczne w długości lub we wartościach elementów pod tymi samymi indeksami

    // Filtrowanie ogłoszeń na podstawie bieżących filtrów
    applyFilters();

    // Jeśli filtry faktycznie się zmieniły:
    if (filtersChanged) {
      // Sprawdza, czy filtry faktycznie się zmieniły. Jeśli tak, wykonuje się blok kodu wewnątrz.
      setCurrentPage(1); // Reset strony na pierwszą po zmianie filtrów
      setSearchParams({ page: 1 }); // Po zmianie filtra wymusza, żeby w przeglądarce od razu pokazało się ?page=1.
      prevFilters.current = {
        // Aktualizacja prevFilters, aby przy kolejnej zmianie można było poprawnie wykryć zmianę
        voivodeship: selectedVoivodeship,
        categories: [...selectedCategories], // Tworzymy kopię tablicy, aby uniknąć mutowania oryginalnej tablicy
      };
    }
  }, [announcements, selectedVoivodeship, selectedCategories]);

  // Synchronizacja currentPage z parametrem w URL przy zmianie strony z klawiatury w pasku nawigacji
  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    if (currentPage !== page) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  // Filtruje ogłoszenia według wybranego przez użytkownika województwa i kategorii
  function applyFilters() {
    let result = [...announcements]; // Kopia wszystkich ogłoszeń

    // Filtruj po województwie (jeśli wybrano konkretne)
    // Ten fragment kodu pozwala wyświetlać tylko te ogłoszenia, które mają województwo wybrane przez użytkownika.
    if (selectedVoivodeship !== 'all') {
      result = result.filter(
        (item) => item.voivodeship === selectedVoivodeship,
      );
    }

    // Filtruj po wybranych kategoriach.
    // Ten fragment kodu pozwala wyświetlać tylko te ogłoszenia, które mają przynajmniej jedną kategorię wybraną przez użytkownika.
    if (selectedCategories.length > 0) {
      // Sprawdza, czy użytkownik wybrał jakieś kategorie
      result = result.filter(
        // Przechodzi przez wszystkie ogłoszenia w tablicy `result`
        (announcement) =>
          selectedCategories.some(
            // Sprawdza, czy przynajmniej jedna wybrana kategoria pasuje do ogłoszenia
            (categoryName) => announcement.category[categoryName],
            // Dla każdej kategorii z selectedCategories sprawdza wartość w obiekcie announcement.category
            // Jeśli jest true → ogłoszenie pasuje do filtra
          ),
      );
    }

    setFilteredAnnouncements(result); // Zapisz przefiltrowane ogłoszenia jako nowy stan
  }

  // Funkcja sortuje ogłoszenia według daty dodania malejąco
  // Płytka kopia za pomocą spread operator [...] wystarczy do obliczeń, ponieważ zmieniana jest tylko kolejność ogłoszeń, a nie ich zawartość
  const sortedAnnouncements = [...filteredAnnouncements].sort(
    (a, b) => new Date(b.datePosted) - new Date(a.datePosted),
  );

  // Wyliczenia do paginacji
  const totalPages = Math.ceil(
    sortedAnnouncements.length / announcementsPerPage,
  );
  const indexOfLast = currentPage * announcementsPerPage;
  const indexOfFirst = indexOfLast - announcementsPerPage;
  // Wyciągnięcie ogłoszeń do bieżącej strony, czyli ogłoszenia od indexOfFirst do indexOfLast, a metoda slice() w JS działa od 1 indeksu włącznie do ostatniego indeksu wyłącznie
  const currentAnnouncements = sortedAnnouncements.slice(
    indexOfFirst,
    indexOfLast, // Ostatni indeks oznacza start kolejnej strony, a slice() sam dba, żeby go nie wziąć
  );

  // Korekta currentPage jeśli przekracza totalPages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
      setSearchParams({ page: totalPages });
    }
  }, [currentPage, totalPages]);

  // Aktualizacja URL przy zmianie strony w paginacji
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page });
  };

  // Obsługa błędu ze stanu przechowywanego w CotextAnnouncements
  if (error)
    return (
      <div className="text-danger logo-font--resp">Błąd ładowania danych</div>
    );
  // Obsługa ładowania ogłoszeń ze stanu przechowywanego w CotextAnnouncements
  if (!announcements)
    return (
      <div className="text-primary logo-font--resp">
        Trwa ładowanie danych...
      </div>
    );

  /** WAŻNE: currentPage synchronizuje się z parametrem `page` w URL.
   * Ręczna zmiana strony w pasku adresu nie zachowuje filtrów, bo URL ich nie przechowuje.
   * To normalne zachowanie. Filtry można też zapisywać w URL, aby przy ręcznej zmianie strony były zachowane.
   * Przydatne w większych aplikacjach, gdy użytkownicy mają kopiować linki ze wszystkimi filtrami.
   */

  return (
    <section className="announcements" ref={topRef}>
      <h2 className="text-primary text-center logo-font--resp">
        Wybierz kategorię zbiórki:
      </h2>
      <div className="select-filters__container">
        {/* Komponent SelectBar odpowiada za wybór województwa */}
        <SelectBar className="flex-grow-1" />
        {/* Komponent Filters odpowiada za przyciski kategorii */}
        <Filters />
        {/* Przycisk resetowania wszystkich filtrów */}
        <button
          type="button"
          className="btn--welcome announcements__filters mt-4"
          onClick={() => {
            setSelectedVoivodeship('all');
            setSelectedCategories([]);
          }}
        >
          Wyczyść
        </button>
      </div>
      {/* Renderowanie kart ogłoszeń */}
      <div className="row g-3 align-items-start">
        {currentAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            numberOfCards={currentAnnouncements.length}
            currentPage={currentPage}
            listType="all"
          />
        ))}
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
