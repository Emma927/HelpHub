import React, { createContext, useState, useEffect, useContext } from 'react';
import { API } from '@/constants.js';

export const AnnouncementsContext = createContext();

/**
 * Provider `AnnouncementsProvider` zarządza stanem ogłoszeń.
 * - Pobiera dane z API przy pierwszym montowaniu komponentu.
 * - Udostępnia wszystkim komponentom potomnym:
 *    - `announcements` – listę ogłoszeń z backendu,
 *    - `error` – błąd pobierania, jeśli wystąpił.
 * - Dane są dostępne w całej aplikacji dzięki kontekstowi `AnnouncementsContext`.
 */
export function AnnouncementsProvider({ children }) {
  const [announcements, setAnnouncements] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${API}/announcements`);
        if (!response.ok) {
          throw new Error('Cannot GET the announcements');
        }
        const data = await response.json();
        console.log(data);
        console.log(import.meta.env.VITE_API_URL); // Sprawdzenie wartości zmiennej środowiskowej w konsoli przeglądarki
        setAnnouncements(data); // funkcja setAnnouncements aktualizuje stan announcements, który zostaje przekazany do komponentów podrzędnych Announcements i AnnouncementsDetails
      } catch (error) {
        console.log(error);
        setError(error); // Funkcja setError aktualizuje stan error, który zostaje przekazany do komponentów podrzędnych Announcements i AnnouncementsDetails
      }
    };

    // Wywołanie fetchAnnouncements służy tylko do uruchomienia pobierania danych, gdy komponent się montuje.
    fetchAnnouncements()
      // Dodatkowa obsługa błędów, jeśli coś poszło nie tak
      .catch((error) => console.error(error));
  }, []);

  return (
    <AnnouncementsContext.Provider value={{ announcements, error }}>
      {children}
    </AnnouncementsContext.Provider>
  );
}

export const useAnnouncements = () => useContext(AnnouncementsContext);
