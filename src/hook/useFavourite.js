import { useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '@/context/UserContext'; // Importuje kontekst użytkownika
import { parseFavsFromLocalStorage } from '@/utils/parseFavsFromLocalStorage'; // Pobiera i zwraca ulubione ogłoszenia użytkownika z localStorage jako tablicę, używa pustej tablicy, jeśli brak danych.

// hook useFavourite przyjmuje announcementId(od AnnouncementCard albo AnnouncementDetails). Hook działa dla pojedynczego ogłoszenia – sprawdza, czy jego id znajduje się w localStorage danego użytkownika (favs_userId) i daje możliwość przełączenia statusu, czyli zarządza stanem ulubionych ogłoszeń zalogowanego użytkownika.
export function useFavourite(announcementId) {
  const { user } = useContext(UserContext); // Pobiera aktualnego użytkownika z UserContext, bo ulubione są dostępne tyko dla zalogowanych
  const [isFaved, setIsFaved] = useState(false); // Ustawia stan isFaved, który śledzi, czy ogłoszenie jest ulubione w komponencie AnnouncementCard i AnnouncementDetails

  // Hook useEffect uruchamia się przy zmianie user lub announcementId. Pobiera aktualną listę ulubionych ogłoszeń z localStorage przy każdej zmianie użytkownika lub identyfikatora ogłoszenia i aktualizuje stan isFaved, aby odzwierciedlić, czy bieżące ogłoszenie jest ulubione.
  useEffect(() => {
    if (!user) return; // Jeśli user jest niezdefiniowany (np. użytkownik nie jest zalogowany), funkcja useEffect kończy działanie i nic więcej się nie wykonuje.

    // favs - jest używana do sprawdzenia, czy konkretne ogłoszenie jest oznaczone jako ulubione i do aktualizacji stanu komponent
    const favs = parseFavsFromLocalStorage(user.id); // favs próbuje pobrać wartość z localStorage pod kluczem, który jest dynamicznie tworzony na podstawie identyfikatora użytkownika (user.id)
    setIsFaved(favs.includes(announcementId)); // Ustawia stan isFaved na true, jeśli announcementId jest w ulubionych
  }, [user, announcementId]);

  // toggleFav- przełącza stan ulubionego ogłoszenia
  // useCallback- jest użyty do zapamiętania funkcji toggleFav, co oznacza, że funkcja ta nie zostanie utworzona na nowo przy każdym renderowaniu komponentu nadrzędnego, chyba że zmienią się jej zależności (user lub announcementId).
  const toggleFav = useCallback(() => {
    if (!user) return; // Jeśli nie ma użytkownika, wyjdź z funkcji
    //`favs_${user.id}`; - Tworzy klucz dla localStorage na podstawie user.id
    const favs = parseFavsFromLocalStorage(user.id); // favs próbuje pobrać wartość z localStorage pod kluczem, który jest dynamicznie tworzony na podstawie identyfikatora użytkownika (user.id)
    const updated = favs.includes(announcementId)
      ? favs.filter((id) => id !== announcementId) // Usuwa announcementId, jeśli jest w ulubionych
      : [...favs, announcementId]; // Dodaje announcementId, jeśli nie ma go w ulubionych

    // Ta linia kodu zapisuje zaktualizowaną listę ulubionych ogłoszeń w localStorage pod określonym kluczem, co pozwala na późniejsze odczytanie i użycie tych danych.
    localStorage.setItem(`favs_${user.id}`, JSON.stringify(updated)); // JSON.stringify(updated) konwertuje zaktualizowaną listę ulubionych (updated) do formatu JSON, ponieważ localStorage może przechowywać tylko dane w formie łańcuchów tekstowych. Dzięki temu lista ulubionych, która jest tablicą, może być poprawnie zapisana w localStorage.
    setIsFaved(updated.includes(announcementId)); // Ustawia isFaved na podstawie zaktualizowanej listy
  }, [user, announcementId]); // Zależności dla useCallback

  return { isFaved, toggleFav }; // Zwraca isFaved i toggleFav z hooka, po to żeby można było je wykorzystać w komponentach AnnouncementCard i AnnouncementDetails
}
