import { useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '@/context/UserContext'; // Importuje kontekst użytkownika

// hook useFavourite przyjmuje announcementId(od AnnouncementCard albo AnnouncementDetails). Ten hook działa dla pojedynczego ogłoszenia – sprawdza, czy jego id znajduje się w localStorage danego użytkownika (favs_userId) i daje możliwość przełączenia statusu, czyli zarządza stanem ulubionych ogłoszeń zalogowanego użytkownika.
export function useFavourite(announcementId) {
  const { user } = useContext(UserContext); // Pobiera aktualnego użytkownika z UserContext, bo ulubione są dostępne tyko dla zalogowanych
  const [isFaved, setIsFaved] = useState(false); // Ustawia stan isFaved, który śledzi, czy ogłoszenie jest ulubione. Ten stan jest używany w komponencie AnnouncementCard i AnnouncementDetails do dynamicznego renderowania interfejsu użytkownika, zmieniając wygląd przycisku serca na czerwony w zależności od tego, czy ogłoszenie jest już ulubione.

  // Hook useEffect uruchamia się przy zmianie user lub announcementId. Pobiera aktualną listę ulubionych ogłoszeń z localStorage przy każdej zmianie użytkownika lub identyfikatora ogłoszenia i aktualizuje stan isFaved, aby odzwierciedlić, czy bieżące ogłoszenie jest ulubione.
  useEffect(() => {
    if (!user) return; // Jeśli nie ma użytkownika, wyjdź z funkcji
    // localStorage działa jako wspólna przestrzeń przechowywania danych dostępna dla wszystkich komponentów w aplikacji. Gdy zmienia się stan ulubionego ogłoszenia o danym id w AnnouncementCard albo AnnouncementDetails, zmiana ta jest zapisywana w localStorage.
    // favs - jest używana do sprawdzenia, czy konkretne ogłoszenie jest oznaczone jako ulubione i do aktualizacji stanu komponent. Dzięki zastosowaniu JSON.parse, favs zawsze będzie tablicą, nawet jeśli nie ma zapisanych danych w localStorage. To zapewnia, że operacje na tablicach, takie jak includes, będą działały poprawnie, bez powodowania błędów.
    const favs = JSON.parse(localStorage.getItem(`favs_${user.id}`) || '[]'); // favs próbuje pobrać wartość z localStorage pod kluczem, który jest dynamicznie tworzony na podstawie identyfikatora użytkownika (user.id). Dzięki użyciu operatora ||, undefined czy błędów przy .includes(...) JSON.parse zawsze otrzyma wartość, którą może poprawnie przetworzyć. W przypadku braku danych w localStorage, zamiast null, zostanie użyty ciąg '[]', co po parsowaniu daje pustą tablicę. To sprawia, że ten zapis jest bezpieczny i nie powoduje błędów parsowania.
    setIsFaved(favs.includes(announcementId)); // Ustawia stan isFaved na true, jeśli announcementId jest w ulubionych
  }, [user, announcementId]);

  // toggleFav- przełącza stan ulubionego ogłoszenia
  // useCallback- jest użyty do zapamiętania funkcji toggleFav, co oznacza, że funkcja ta nie zostanie utworzona na nowo przy każdym renderowaniu komponentu nadrzędnego, chyba że zmienią się jej zależności (user lub announcementId). To może pomóc w uniknięciu niepotrzebnych renderów komponentów dzieci, które otrzymują toggleFav jako prop, nie będą musiały się ponownie renderować tylko dlatego, że referencja do funkcji się zmieniła.
  const toggleFav = useCallback(() => {
    if (!user) return; // Jeśli nie ma użytkownika, wyjdź z funkcji
    //`favs_${user.id}`; - Tworzy klucz dla localStorage na podstawie user.id
    const favs = JSON.parse(localStorage.getItem(`favs_${user.id}`) || '[]'); // favs próbuje pobrać wartość z localStorage pod kluczem, który jest dynamicznie tworzony na podstawie identyfikatora użytkownika (user.id). Dzięki użyciu operatora || zapewnia, że JSON.parse zawsze otrzyma wartość, którą może poprawnie przetworzyć. W przypadku braku danych w localStorage, zamiast null, zostanie użyty ciąg '[]', co po parsowaniu daje pustą tablicę. To sprawia, że ten zapis jest bezpieczny i nie powoduje błędów parsowania.
    // updated - aktualizuje listę ulubionych: usuwa lub dodaje announcementId
    const updated = favs.includes(announcementId)
      ? favs.filter((id) => id !== announcementId) // Usuwa announcementId, jeśli jest w ulubionych
      : [...favs, announcementId]; // Dodaje announcementId, jeśli nie ma go w ulubionych

    // Ta linia kodu zapisuje zaktualizowaną listę ulubionych ogłoszeń w localStorage pod określonym kluczem, co pozwala na późniejsze odczytanie i użycie tych danych.
    localStorage.setItem(`favs_${user.id}`, JSON.stringify(updated)); // JSON.stringify(updated) konwertuje zaktualizowaną listę ulubionych (updated) do formatu JSON, ponieważ localStorage może przechowywać tylko dane w formie łańcuchów tekstowych. Dzięki temu lista ulubionych, która jest tablicą, może być poprawnie zapisana w localStorage.
    // Zapisuje dane w localStorage, co jest wbudowanym mechanizmem przeglądarki do przechowywania danych w formie klucz-wartość.
    // key=`favs_${user.id}` to klucz, pod którym dane są przechowywane. W tym przypadku klucz jest dynamicznie generowany i oparty na identyfikatorze użytkownika (user.id)
    setIsFaved(updated.includes(announcementId)); // Ustawia isFaved na podstawie zaktualizowanej listy
  }, [user, announcementId]); // Zależności dla useCallback

  return { isFaved, toggleFav }; // Zwraca isFaved i toggleFav z hooka, po to żeby można było je wykorzystać w komponentach AnnouncementCard i AnnouncementDetails
}
