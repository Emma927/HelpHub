import React, { useContext, useState, useEffect, useRef } from 'react';
import { FiltersContext } from '@/context/FiltersContext';
import { AnnouncementsContext } from '@/context/AnnouncementsContext';
import SelectBar from '@/components/SelectBar';
import Filters from '@/components/Filters';
import AnnouncementCard from '@/components/AnnouncementCard';
import AnnouncementsPagination from '@/components/AnnouncementsPagination';

function Announcements() {
  // Dostęp do globalnych ogłoszeń i błędu z Context API
  const { announcements, error } = useContext(AnnouncementsContext);

  const {
    selectedVoivodeship,
    setSelectedVoivodeship,
    selectedCategories,
    setSelectedCategories,
    currentPage,
    setCurrentPage,
  } = useContext(FiltersContext);

  //const topRef = useRef(null); tworzy odniesienie, które najpierw jest puste (null). Po zamontowaniu komponentu to odniesienie wskazuje na element <section>, do którego zostało przypisane. Dzięki temu można bezpośrednio manipulować tym elementem, przewijać stronę do góry przy zmianie strony w paginacji.
  const topRef = useRef(null); // useRef(null) oznacza, że początkowa wartość current w obiekcie zwracanym przez useRef jest null. To dlatego, że na etapie inicjalizacji komponentu element DOM, do którego referencja będzie przypisana, jeszcze nie istnieje. Po zamontowaniu komponentu, current w obiekcie zwróconym przez useRef przechowuje odniesienie do elementu DOM, do którego ref został przypisany. W tym przypadku, current przechowuje odniesienie do elementu <section>, co pozwala na bezpośrednią manipulację tym elementem, na przykład przewijanie do niego strony.

  // filteredAnnouncements – zawiera listę ogłoszeń po przefiltrowaniu
  // setFilteredAnnouncements – ustawia wynik działania filtrów
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]); // Pusta Tablica: Inicjalizuje stan bez wybranych kategorii.
  // Liczba ogłoszeń na stronie
  const announcementsPerPage = 24;

  // topRef.current.scrollIntoView({ behavior: "smooth" }) przewija stronę do elementu <section>, do którego przypisana jest referencja topRef. Jest to używane do przewijania strony do góry, gdy zmienia się strona w paginacji (currentPage).
  // useEffect z tablicą zależności [currentPage] oznacza, że przewijanie do góry nastąpi za każdym razem, gdy zmieni się currentPage. To zapewnia, że użytkownik widzi początek listy ogłoszeń, gdy przełącza się między stronami.
  // Przewijanie do góry listy ogłoszeń po zmianie strony
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // useEffect reaguje na zmianę danych(ogłoszeń) lub filtrów z tablicy zależności, aby uruchomić filtrowanie
  useEffect(() => {
    if (announcements) {
      applyFilters();
    }
  }, [announcements, selectedVoivodeship, selectedCategories]);

  // applyFilters – filtruje dane po województwie i kategoriach, umożliwia dynamiczne filtrowanie danych w oparciu o wybory użytkownika
  function applyFilters() {
    let result = [...announcements];

    if (selectedVoivodeship !== 'all') {
      result = result.filter(
        (item) => item.voivodeship === selectedVoivodeship,
      );
    }

    // Sprawdza, czy użytkownik wybrał jakieś kategorie do filtrowania, jeśli nie, kod nic nie filtruje.
    // Ogłoszenie zostaje uwzględnione w wynikach, jeśli ma choć jedną kategorię, którą użytkownik zaznaczył i która jest aktywna (true) w danych ogłoszenia.
    // item to jedno ogłoszenie
    // item.category to jego obiekt kategorii
    // .some(...) sprawdza, czy ogłoszenie ma przynajmniej jedną z kategorii zaznaczoną przez użytkownika i aktywną
    if (selectedCategories.length > 0) {
      result = result.filter((item) =>
        // item.category to obiekt z database json : category = {clothesAndShoes: true, accessories: false, urgent: true}
        // Object.entries(...) przekształca to w tablicę par [klucz, wartość]
        Object.entries(item.category).some(
          ([key, val]) =>
            //.some(([key, val]) => val && selectedCategories.includes(key))
            // Dla każdej pary [key, val] sprawdza:
            // Czy val === true → czyli ta kategoria jest zaznaczona w ogłoszeniu.
            // Czy key znajduje się w selectedCategories → czyli czy użytkownik ją wybrał.
            // .some(...) zwraca true, jeśli chociaż jedna taka kategoria pasuje.
            val && selectedCategories.includes(key), // Resetuje aktualną stronę do 1 po każdej zmianie filtrów, aby użytkownik zawsze widział wyniki od początku po zastosowaniu nowych filtrów
        ),
      );
    }

    setFilteredAnnouncements(result); // Ustawia przefiltrowane ogłoszenia jako nowy stan
    setCurrentPage(1); // Resetuje stronę po każdej zmianie filtrów
  }

  // Posortowanie ogłoszenia według daty dodania malejąco - płytka kopia za pomocą spread operator [...] wystarczy, ponieważ zmieniana jest tylko kolejność ogłoszeń. Chodzi tylko o zmianę kolejności elementów w tablicy, a nie ich zawartości więc płytka kopia tutaj pasuje, gdyby była zmieniana zawartość elementów tabicy potrzebna byłaby kopia głeboka.
  const sortedAnnouncements = [...filteredAnnouncements].sort(
    (a, b) => new Date(b.datePosted) - new Date(a.datePosted),
  );

  // Wyliczenia do paginacji - metoda dzielenia dużych zbiorów danych na podstrony, z kontrolą, które elementy się wyświetlają – zgodnie z aktualną stroną
  // totalPages - ilość stron z podziału wszystkich ogłoszeń na 24 ogłoszenia na 1 stronie
  // sortedAnnouncements.length to liczba ogłoszeń po filtracji i sortowaniu.
  // announcementsPerPage to stała, aktualnie 24 ogłoszenia na 1 stronę.
  // Math.ceil(...) zaokrągla w górę, bo jak jest np. 49 ogłoszeń i 24 na stronę, to potrzebuję 3 strony.
  const totalPages = Math.ceil(
    sortedAnnouncements.length / announcementsPerPage,
  );
  // IndexOfLast - Wylicza indeks ostatniego ogłoszenia na bieżącej stronie.
  const indexOfLast = currentPage * announcementsPerPage;
  // IndexOdFirst - Wylicza pierwszy indeks ogłoszenia na tej stronie.
  const indexOfFirst = indexOfLast - announcementsPerPage;
  // currentAnnouncements - Wyciąga fragment tablicy, czyli ogłoszenia od indexOfFirst do indexOfLast
  const currentAnnouncements = sortedAnnouncements.slice(
    indexOfFirst,
    indexOfLast,
  ); // slice w JS działa do indeksu nie włącznie, więc działa idealnie.

  // Obsługa błędu lub ładowania - Obsługa błędów i danych powinna być w return - oplatając section, czy wcześniej? a może nie ma znaczenia?
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
      {/*container może być ale nie musi w section w divie z klasą announcements - została do sprawdzenia!!!*/}
      {/* Renderowanie kart ogłoszeń */}
      <div className="row g-3  align-items-start">
        {currentAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            numberOfCards={currentAnnouncements.length}
          />
        ))}
      </div>
      {/*Paginacja (jeśli więcej niż 1 strona) */}
      {totalPages > 1 && <AnnouncementsPagination totalPages={totalPages} />}
    </section>
  );
}

export default Announcements;
