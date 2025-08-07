import React, { useContext, useState, useEffect, useRef } from 'react';
import { FiltersContext } from '@/context/FiltersContext';
import { AnnouncementsContext } from '@/context/AnnouncementsContext';
import SelectBar from '@/components/SelectBar';
import Filters from '@/components/Filters';
import AnnouncementCard from '@/components/AnnouncementCard';
import PaginationComponent from '@/components/PaginationComponent';

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

  // topRef- tworzy referencję, która jest przypisana do konkretnego elementu DOM, a useRef pozwala na bezpośredni dostęp do elementów DOM
  const topRef = useRef(null); // Na etapie inicjalizacji komponentu element DOM, do którego referencja będzie przypisana, jeszcze nie istnieje, po zamontowaniu komponentu, właściwość current w obiekcie zwróconym przez useRef przechowuje odniesienie do elementu DOM, do którego ref został przypisany (<section>)

  // filteredAnnouncements – zawiera listę ogłoszeń po przefiltrowaniu
  // setFilteredAnnouncements – ustawia wynik działania filtrów
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]); // Pusta tablica inicjalizuje stan bez wybranych kategorii.
  const announcementsPerPage = 24; // Liczba ogłoszeń na stronę

  // useRef pozwala na przechowywanie wartości, które można zmieniać bez wpływu na cykl życia komponentu
  // useRef tworzy obiekt, który przechowuje poprzednie wartości wybranego województwa i kategorii, aby śledzić te wartości pomiędzy renderowaniami bez wywoływania ponownego renderowania komponentu.
  const prevFilters = useRef({
    // Bez useRef- gdyby użyć zwykłego stanu useState do przechowywania tych wartości, każda aktualizacja stanu spowodowałaby ponowne renderowanie komponentu, co nie zawsze jest pożądane, szczególnie jeśli chce się tylko śledzić zmiany, a nie reagować na nie bezpośrednio w interfejsie.

    voivodeship: selectedVoivodeship,
    categories: selectedCategories,
  });

  // Płynne 'smooth' przewijanie listy ogłoszeń do góry po zmianie strony currentPage zapewnia, że użytkownik widzi początek listy ogłoszeń, gdy przełącza się między stronami.
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  // Za każdym razem, gdy nowe ogłoszenia są dostępne lub użytkownik zmienia filtr, ten kod w useEffect się wykona.
  useEffect(() => {
    if (announcements) {
      const filtersChanged = // Ta funkcja ustala, czy filtry zostały zmienione w porównaniu do poprzedniego stanu. Porównuje bieżące województwo i kategorie z tymi zapisanymi w prevFilters.current.
        prevFilters.current.voivodeship !== selectedVoivodeship || // current jest właściwością obiektu zwracanego przez useRef, która służy do przechowywania wartości, które chcę śledzić między renderowaniami komponentu, bez wpływu na cykl renderowania. Jest to bardzo przydatne, gdy potrzebujesz zachować stan lub referencję, która nie powinna wpływać na ponowne renderowanie komponentu.
        JSON.stringify(prevFilters.current.categories) !== //JSON.stringify konwertuje obiekt lub tablicę do reprezentacji tekstowej. Dzięki temu możemy porównać zawartość dwóch tablic lub obiektów, porównując ich reprezentacje tekstowe. Pozwala na porównanie rzeczywistej zawartości tablic lub obiektów, a nie tylko ich odniesień w pamięci jak przez operator porównania. Dzięki temu możemy sprawdzić, czy dane w tablicach są takie same, nawet jeśli są to różne instancje tablic.
          JSON.stringify(selectedCategories);

      applyFilters(); // Wywołuje funkcję applyFilters, która filtruje ogłoszenia na podstawie wybranych filtrów. To kluczowy krok, który zapewnia, że wyświetlane są tylko te ogłoszenia, które spełniają kryteria filtrów.

      if (filtersChanged) {
        // Sprawdza, czy filtry faktycznie się zmieniły. Jeśli tak, wykonuje się blok kodu wewnątrz.
        setCurrentPage(1); // Resetowanie strony paginacji do 1 po zmianie filtra. Po zmianie filtrów chcemy, aby użytkownik widział wyniki od początku, a nie np. od 24 strony. Użytkownik może być na przykład na 24 stronie i tam zmienić filter, aby nie pojawiła się strona 24 z nowego filtra tylko 1 potrzebne jest ustawienie strony na 1.
        prevFilters.current = {
          // Służy do aktualizacji wartości referencji po tym, jak sprawdzimy, czy filtry się zmieniły
          // Aktualizuje prevFilters.current o nowe wartości filtrów. Dzięki temu przy następnym uruchomieniu useEffect można porównać, czy filtry się zmieniły.

          voivodeship: selectedVoivodeship,
          categories: selectedCategories,
        };
      }
    }
  }, [announcements, selectedVoivodeship, selectedCategories]);

  // Funckja applyFilters – filtruje dane po województwie i kategoriach, umożliwia dynamiczne filtrowanie danych w oparciu o wybory użytkownika
  function applyFilters() {
    let result = [...announcements]; // results tworzy płytką kopię tablicy announcements, dzięki temu oryginalna tablica nie jest modyfikowana, a wszystkie operacje filtrowania są wykonywane na kopii.

    // Funkcja ma na celu przefiltrowanie ogłoszeń, aby wyświetlić tylko te, które pasują do wybranego województwa, chyba że użytkownik chce zobaczyć wszystkie ogłoszenia, to wybiera domyślną opcję.
    if (selectedVoivodeship !== 'all') {
      // Metoda filter tworzy nową tablicę zawierającą tylko te elementy, które spełniają określony warunek. Sprawdza, czy użytkownik wybrał konkretne województwo, a nie opcję "wszystkie" ('all')-czyli "Wybierz wojewódżtwo". Jeśli wybrano konkretne województwo, filtrujemy ogłoszenia.
      result = result.filter(
        (item) => item.voivodeship === selectedVoivodeship, // Wynik filtrowania tablicy result zostawia tylko te ogłoszenia, których właściwość voivodeship jest równa selectedVoivodeship, czyli te, które są przypisane do wybranego województwa.
      );
    }

    // Warunek sprawdza, czy istnieje przynajmniej jedna kategoria, która jest napisana w ogłoszeniu i jednocześnie została wybrana przez użytkownika- jeśli tak, ogłoszenie zostaje uwzględnione w przefiltrowanych wynikach, a jeśli nie, kod nic nie filtruje.

    // Ogłoszenie zostaje uwzględnione w wynikach, jeśli ma chociaż jedną kategorię, którą użytkownik zaznaczył i która jest napisana (true) w danych ogłoszenia, to pozwala na dynamiczne filtrowanie danych w zależności od wyboru użytkownika.
    // item to jedno ogłoszenie
    // item.category to jego obiekt kategorii
    // .some(...) sprawdza, czy chociaż jedna para [key, val] spełnia warunek, że kategoria jest zapisana na ogłoszeniu i użytkownik ją wybrał. Jeśli tak, ogłoszenie zostaje w wynikach filtrowania
    if (selectedCategories.length > 0) {
      //Sprawdza, czy użytkownik wybrał jakieś kategorie (selectedCategories.length > 0).
      result = result.filter((item) =>
        // item.category to obiekt z database json : category = {clothesAndShoes: true, accessories: false, urgent: true}
        // Object.entries- zamienia obiekt kategorii na tablicę par, np.: ["clothesAndShoes", true]
        Object.entries(item.category).some(
          ([key, val]) =>
            //.some(([key, val]) => val && selectedCategories.includes(key))
            // Dla każdej pary [key, val] sprawdza:
            // Czy val === true, czyli ta kategoria jest zaznaczona w ogłoszeniu, to oznacza, że w obiekcie JSON dla tego ogłoszenia, wartość dla tej kategorii jest ustawiona na true.
            // Czy key znajduje się w selectedCategories → czyli czy użytkownik ją wybrał z filtrów. Jeśli tak, to oznacza, że użytkownik wybrał tę kategorię w filtrach. selectedCategories to tablica zawierająca nazwy kategorii, które użytkownik chce zobaczyć.
            // .some(...) zwraca true, jeśli chociaż jedna taka kategoria pasuje.
            val && selectedCategories.includes(key),
        ),
      );
    }

    setFilteredAnnouncements(result); // Ustawia przefiltrowane ogłoszenia jako nowy stan
  }

  // Posortowanie ogłoszenia według daty dodania malejąco- płytka kopia za pomocą spread operator [...] wystarczy, ponieważ zmieniana jest tylko kolejność ogłoszeń. Chodzi tylko o zmianę kolejności elementów w tablicy, a nie ich zawartości więc płytka kopia tutaj pasuje, gdyby była zmieniana zawartość elementów tabicy potrzebna byłaby kopia głeboka.
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
  // IndexOfFirst - Wylicza pierwszy indeks ogłoszenia na tej stronie.
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
      {/* Renderowanie kart ogłoszeń */}
      <div className="row g-3 align-items-start">
        {currentAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            numberOfCards={currentAnnouncements.length}
          />
        ))}
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default Announcements;
