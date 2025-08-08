import React, { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '@/context/UserContext';
import { AnnouncementsContext } from '@/context/AnnouncementsContext';
import AnnouncementCard from '@/components/AnnouncementCard';
import PaginationComponent from '@/components/PaginationComponent';
import { parseFavsFromLocalStorage } from '@/utils/parseFavsFromLocalStorage'; // Pobiera i zwraca ulubione ogłoszenia użytkownika z localStorage jako tablicę, używa pustej tablicy, jeśli brak danych.

// Komponent, który renderuje ulubione ogłoszenia użytkownika
function FavouriteAnnouncements() {
  const { user } = useContext(UserContext); // Pobiera dane o użytkowniku z kontekstu
  const { announcements } = useContext(AnnouncementsContext); // Pobiera dane ogłoszeń z kontekstu
  const [favs, setFavs] = useState([]); // Stan ulubionych ogłoszeń
  const announcementsPerPage = 24; // Liczba ogłoszeń przypadająca na 1 stronę paginacji
  const [currentPage, setCurrentPage] = useState(1); // Ustawia początkową stronę paginacji na 1
  const topRef = useRef(null); // Tworzy referencję, która będzie używana do przewijania do góry strony

  // Pierwszy useEffect- to automatyczne załadowanie ulubionych ogłoszeń z localStorage przy zmianie użytkownika (user). Pobiera ulubione ogłoszenia z localStorage na podstawie user.id i ustawia je w stanie favs.
  // localStorage do przechowywania i pobierania ulubionych ogłoszeń użytkownika, używa localStorage.getItem(key) do pobrania danych i JSON.parse do ich przekształcenia w obiekt JavaScript.
  useEffect(() => {
    if (!user) return; // Jeśli użytkownik nie jest zalogowany, żadne ulubione ogłoszenia nie zostają pobrane
    const stored = parseFavsFromLocalStorage(user.id); // Pobierz i sparsuj favs z localStorage dla użytkownika; ustaw jako pustą tablicę, jeśli brak danych.
    setFavs(stored); // Aktualizuje stan ulubionych, umożliwiając operacje na danych.
  }, [user]);

  // Drugi useEffect- Uruchamia się, gdy zmienia się bieżąca strona, wtedy przewija stronę do góry do elementu z topRef.
  // current jest właściwością obiektu referencji utworzonego za pomocą hooka useRef. Referencja ref={topRef} jest przypisana do <section>, current będzie się odnosić do tego elementu DOM po zamontowaniu komponentu.
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // updateFavs- aktualizuje stan favs na podstawie ulubionych ogłoszeń zapisanych w localStorage, gdy w trakcie działania aplikacji (np. po dodaniu lub usunięciu ulubionego ogłoszenia) trzeba ręcznie zaktualizować stan favs na podstawie aktualnych danych z localStorage.
  const updateFavs = () => {
    // stored- zmienna, która przechowuje dane pobrane z localStorage, jest używana w funkcji updateFavs do ustawienia stanu ulubionych ogłoszeń w aplikacji.
    const stored = parseFavsFromLocalStorage(user.id); // stored pobiera favs z localStorage dla użytkownika; używa pustej tablicy, jeśli brak danych.
    setFavs(stored); // setFavs(stored); ustawia stan ulubionych ogłoszeń w aplikacji na wartość stored. setFavs jest funkcją, która pochodzi z hooka-useState i jest używana do aktualizacji stanu komponentu.
  };

  // Sprawdza, czy user i announcements istnieją. Jeśli nie, nie renderuje nic
  if (!user || !announcements) return null;

  // Filtruje ogłoszenia, aby wyświetlić tylko te, które są ulubionymi (favs.includes(a.id)). filter() tworzy nową tablicę zawierającą tylko te elementy, które spełniają określony warunek.
  const favAnnouncements = announcements.filter((a) => favs.includes(a.id));
  // Oblicza całkowitą liczbę stron potrzebnych do wyświetlenia wszystkich ulubionych ogłoszeń
  const totalPages = Math.ceil(favAnnouncements.length / announcementsPerPage);
  // Oblicza indeks ostatniego ogłoszenia na bieżącej stronie
  const indexOfLast = currentPage * announcementsPerPage;
  // Oblicza indeks pierwszego ogłoszenia na bieżącej stronie
  const indexOfFirst = indexOfLast - announcementsPerPage;
  // Wyodrębnia ogłoszenia, które powinny być wyświetlone na bieżącej stronie
  const currentFavs = favAnnouncements.slice(indexOfFirst, indexOfLast);

  let additionalClass = ''; // Na początek brak dodatkowej klasy
  if (currentFavs.length === 1) {
    // Jeśli jest jedno polubione ogłoszenie to dodaje klasę only-card
    additionalClass = 'only-card';
  } else if (currentFavs.length === 2) {
    // Jeśli są tylko 2 polubione ogłoszenia to dodaje klasę two-cards
    additionalClass = 'two-cards';
  }

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
              className={`card__announcement card-custom ${additionalClass}`}
              onToggleFav={updateFavs}
            />
          ))}
        </div>
      )}
      {/*PaginationComponent otrzymuje bieżącą stronę, całkowitą liczbę stron i funkcję zmiany strony. Ta funkcja jest używana do aktualizacji stanu currentPage, co pozwala na zmianę bieżącej strony, gdy użytkownik przełącza się między stronami w paginacji*/}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default FavouriteAnnouncements;
