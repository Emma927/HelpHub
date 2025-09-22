import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/context/UserContext'; // Importuje kontekst użytkownika
import { parseFavsFromLocalStorage } from '@/utils/parseFavsFromLocalStorage'; // Pobiera i zwraca ulubione ogłoszenia użytkownika z localStorage jako tablicę, używa pustej tablicy, jeśli brak danych.

/**
 * Hook `useFavourite` zarządza stanem ulubionych ogłoszeń dla zalogowanego użytkownika.
 * - Przyjmuje `announcementId` pojedynczego ogłoszenia.
 * - Sprawdza, czy ogłoszenie znajduje się w ulubionych zapisanych w localStorage dla aktualnego użytkownika.
 * - Zwraca:
 *    - `isFaved` – boolean, czy ogłoszenie jest w ulubionych,
 *    - `toggleFav` – funkcję do przełączania statusu ulubionego (dodawanie/usuwanie z localStorage).
 * - Hook automatycznie aktualizuje stan przy zmianie użytkownika lub identyfikatora ogłoszenia.
 *
 * Użycie:
 * - `AnnouncementCard`
 * - `AnnouncementDetails`
 */
export function useFavourite(announcementId) {
  const { user } = useUser(); // Pobiera zalogowanego użytkownika
  const [isFaved, setIsFaved] = useState(false); // Stan, który śledzi, czy ogłoszenie jest ulubione

  // Synchronizacja stanu ulubionych przy zmianie użytkownika lub ID ogłoszenia
  useEffect(() => {
    if (!user) return; // Brak użytkownika

    const favs = parseFavsFromLocalStorage(user.id); // Pobranie ulubionych z localStorage
    setIsFaved(favs.includes(announcementId)); // Ustawienie stanu isFaved
  }, [user, announcementId]);

  /**
   * toggleFav – funkcja przełączająca stan ulubionego ogłoszenia.
   * useCallback jest użyty w celu „zapamiętania” tej funkcji między renderami komponentu,
   * co ma kilka zalet:
   * - Funkcja nie jest tworzona na nowo przy każdym renderze komponentu,
   *   co zmniejsza niepotrzebne renderowania podkomponentów, które mogą używać toggleFav jako prop.
   * - Zapobiega niekontrolowanemu wywoływaniu efektów w innych hookach (np. w useEffect zależnym od toggleFav),
   *   ponieważ referencja funkcji pozostaje stabilna dopóki nie zmienią się jej zależności (user lub announcementId).
   * - Dzięki temu komponenty typu AnnouncementCard czy AnnouncementDetails mogą optymalnie reagować
   *   na zmianę stanu ulubionego, bez zbędnych renderów.
   */
  const toggleFav = useCallback(() => {
    if (!user) return; // Jeśli nie ma użytkownika, wyjdź z funkcji
    const favs = parseFavsFromLocalStorage(user.id); // Aktualne ulubione
    const updated = favs.includes(announcementId)
      ? favs.filter((id) => id !== announcementId) // Usuwa announcementId, jeśli jest w ulubionych
      : [...favs, announcementId]; // Dodaje announcementId, jeśli nie ma go w ulubionych

    // Aktualizacja localStorage pod określonym kluczem, co pozwala na późniejsze odczytanie i użycie tych danych.
    localStorage.setItem(`favs_${user.id}`, JSON.stringify(updated));
    setIsFaved(updated.includes(announcementId)); // Ustawia isFaved na podstawie zaktualizowanej listy
  }, [user, announcementId]); // Zależności dla useCallback

  return { isFaved, toggleFav }; // Zwraca stan i funkcję do użycia w komponentach AnnouncementCard i AnnouncementDetails
}
