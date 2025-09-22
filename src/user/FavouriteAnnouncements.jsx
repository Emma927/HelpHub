import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@/context/UserContext';
import { useAnnouncements } from '@/context/AnnouncementsContext';
import AnnouncementCard from '@/components/AnnouncementCard';
import PaginationComponent from '@/components/PaginationComponent';
import { parseFavsFromLocalStorage } from '@/utils/parseFavsFromLocalStorage';
import { useSearchParams } from 'react-router-dom';

/**
 * Komponent wyświetlający ulubione ogłoszenia zalogowanego użytkownika
 * z paginacją i synchronizacją z parametrem `page` w URL.
 */
function FavouriteAnnouncements() {
  const { user } = useUser();
  const { announcements } = useAnnouncements();
  const [favs, setFavs] = useState([]); // Stan ulubionych ogłoszeń
  const announcementsPerPage = 12; // Liczba ogłoszeń na jednej stronie
  const [searchParams, setSearchParams] = useSearchParams(); // Hook React Router – pozwala odczytać i zmieniać parametry w URL, np. ?page=3
  const initialPage = parseInt(searchParams.get('page')) || 1; // Pobiera numer strony z URL (?page=...), zamienia na liczbę.
  // Jeśli nie ma parametru, używa domyślnie 1
  const [currentPage, setCurrentPage] = useState(initialPage); // Stan przechowujący bieżącą stronę paginacji, inicjalizowany wartością z URL
  const topRef = useRef(null); // Tworzy referencję, która będzie używana do przewijania do góry strony

  /**
   * Załaduj ulubione ogłoszenia z localStorage przy zmianie użytkownika.
   * Jeśli użytkownik nie jest zalogowany, nie wykonuje akcji.
   * Jeśli w localStorage brak danych dla danego użytkownika, ustawia pustą tablicę.
   */
  useEffect(() => {
    if (!user) return;
    const stored = parseFavsFromLocalStorage(user.id); // Pobierz i sparsuj favs z localStorage dla użytkownika; ustaw jako pustą tablicę, jeśli brak danych.
    setFavs(stored); // Aktualizuje stan ulubionych, umożliwiając operacje na danych.
  }, [user]);

  /**
   * Przewija stronę do góry przy zmianie currentPage
   */
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  /**
   * Filtruje wszystkie ogłoszenia, aby wyświetlić tylko ulubione.
   * Nawet jeśli announcements jest null/undefined, filtrowanie wykona się na pustej tablicy i nie spowoduje błędu
   * announcements || [] gwarantuje, że zawsze mamy tablicę.
   */
  const favAnnouncements = (announcements || []).filter((a) =>
    favs.includes(a.id),
  );
  // Oblicza całkowitą liczbę stron potrzebnych do wyświetlenia wszystkich ulubionych ogłoszeń
  const totalPages = Math.ceil(favAnnouncements.length / announcementsPerPage);

  /**
   * Synchronizacja currentPage z parametrem w URL.
   * Ogranicza wartość currentPage do totalPages.
   */
  useEffect(() => {
    const pageInURL = parseInt(searchParams.get('page')) || 1;
    let newPage = pageInURL;

    if (pageInURL > totalPages && totalPages > 0) {
      newPage = totalPages; // Nie pozwalamy na stronę większą niż totalPages
    }

    if (currentPage !== newPage) {
      setCurrentPage(newPage);
      if (pageInURL !== newPage) setSearchParams({ page: newPage });
    }
  }, [searchParams, currentPage, totalPages, setSearchParams]);

  // Wyznaczenie ogłoszeń dla bieżącej strony
  const indexOfLast = currentPage * announcementsPerPage; // Oblicza indeks ostatniego ogłoszenia na bieżącej stronie
  const indexOfFirst = indexOfLast - announcementsPerPage; // Oblicza indeks pierwszego ogłoszenia na bieżącej stronie
  const currentFavs = favAnnouncements.slice(indexOfFirst, indexOfLast); // Wyodrębnia ogłoszenia, które powinny być wyświetlone na bieżącej stronie

  /**
   * Aktualizuje stan ulubionych ogłoszeń po zmianie w localStorage
   */
  const updateFavs = () => {
    const stored = parseFavsFromLocalStorage(user.id);
    setFavs(stored);
  };

  /**
   * Funkcja obsługująca zmianę strony w paginacji
   * @param {number} page - numer nowej strony
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page });
  };

  // Sprawdza, czy user i announcements istnieją. Jeśli brak użytkownika lub ogłoszeń, nie renderujemy nic
  if (!user || !announcements) return null;

  return (
    <section
      className="announcements d-flex flex-column align-items-center"
      ref={topRef}
    >
      <h2 className="logo-font--resp text-primary mb-4">
        Twoje ulubione ogłoszenia:
      </h2>
      {currentFavs.length === 0 ? (
        <p className="logo-font--resp text-danger">
          Nie masz jeszcze ulubionych zbiórek.
        </p>
      ) : (
        <div className="row g-3 align-items-start">
          {currentFavs.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              numberOfCards={currentFavs.length}
              onToggleFav={updateFavs}
              currentPage={currentPage} // przekazanie aktualnej strony
              listType="favourites"
            />
          ))}
        </div>
      )}
      {/*PaginationComponent otrzymuje bieżącą stronę, całkowitą liczbę stron i funkcję zmiany strony.*/}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default FavouriteAnnouncements;
