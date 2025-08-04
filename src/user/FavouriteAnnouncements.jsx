import React, { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '@/context/UserContext';
import { AnnouncementsContext } from '@/context/AnnouncementsContext';
import AnnouncementCard from '@/components/AnnouncementCard';
import PaginationComponent from '@/components/PaginationComponent';

// Komponent, który renderuje ulubione ogłoszenia użytkownika
function FavouriteAnnouncements() {
  const { user } = useContext(UserContext); // Pobiera dane o użytkowniku z kontekstu
  const { announcements } = useContext(AnnouncementsContext); // Pobiera dane ogłoszeń z kontekstu
  const [favs, setFavs] = useState([]);
  const announcementsPerPage = 24; // liczba ogłoszeń przypadająca na 1 stronę paginacji
  const [currentPage, setCurrentPage] = useState(1); // Ustawia początkową stronę paginacji na 1
  const topRef = useRef(null); // Tworzy referencję, która będzie używana do przewijania do góry strony

  //  Pierwszy useEffect- to automatyczne załadowanie ulubionych ogłoszeń z localStorage przy zmianie użytkownika (user). Pobiera ulubione ogłoszenia z localStorage na podstawie user.id i ustawia je w stanie favs.
  // localStorage do przechowywania i pobierania ulubionych ogłoszeń użytkownika. Używa localStorage.getItem(key) do pobrania danych i JSON.parse do ich przekształcenia w obiekt JavaScript.
  useEffect(() => {
    if (!user) return; // Jeśli użytkownik nie jest zalogowany, żadne ulubione ogłoszenia nie zostają pobrane
    const stored = JSON.parse(localStorage.getItem(`favs_${user.id}`) || '[]'); // stored próbuje pobrać wartość z localStorage pod kluczem, który jest dynamicznie tworzony na podstawie identyfikatora użytkownika (user.id). Dzięki użyciu operatora ||, JSON.parse zawsze otrzyma wartość, którą może poprawnie przetworzyć. W przypadku braku danych w localStorage, zamiast null, zostanie użyty ciąg '[]', co po parsowaniu daje pustą tablicę. To sprawia, że ten zapis jest bezpieczny i nie powoduje błędów parsowania.
    setFavs(stored); // Aktualizuje stan ulubionych
  }, [user]);

  // Drugi useEffect- Uruchamia się, gdy zmienia się currentPage-bieżąca strona. Przewija stronę do góry do elementu z topRef, gdy zmienia się currentPage. current jest właściwością obiektu referencji utworzonego za pomocą hooka useRef.Referencja ref={topRef} jest przypisana do section, current będzie się odnosić do tego elementu DOM po zamontowaniu komponentu.
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // updateFavs- aktualizuje stan favs na podstawie ulubionych ogłoszeń zapisanych w localStorage
  const updateFavs = () => {
    // stored - to zmienna, która przechowuje dane pobrane z localStorage, ale jest używana w funkcji updateFavs do ustawienia stanu ulubionych ogłoszeń w aplikacji.
    const stored = JSON.parse(localStorage.getItem(`favs_${user.id}`) || '[]'); // stored próbuje pobrać wartość z localStorage pod kluczem, który jest dynamicznie tworzony na podstawie identyfikatora użytkownika (user.id). Dzięki użyciu operatora ||, JSON.parse zawsze otrzyma wartość, którą może poprawnie przetworzyć. W przypadku braku danych w localStorage, zamiast null, zostanie użyty ciąg '[]', co po parsowaniu daje pustą tablicę. To sprawia, że ten zapis jest bezpieczny i nie powoduje błędów parsowania-przekształcania danych na tablicę.
    setFavs(stored);
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
          Nie masz jeszcze ulubionych ofert.
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
      {/*FavouriteAnnouncements przekazuje komponentowi paginacji propsy: bieżącą stronę paginacji do komponentu PaginationComponent; całkowitą liczbę stron, które są potrzebne do wyświetlenia wszystkich ulubionych ogłoszeń; funkcję setCurrentPage jako props onPageChange. Ta funkcja jest używana do aktualizacji stanu currentPage, co pozwala na zmianę bieżącej strony, gdy użytkownik przełącza się między stronami w paginacji*/}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default FavouriteAnnouncements;
