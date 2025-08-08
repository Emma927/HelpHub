import React, { createContext, useState, useEffect } from 'react';
import { API } from '@/constans.js';

// Tworzenie kontekstu dla ogłoszeń
export const AnnouncementsContext = createContext(); // Tworzy obiekt kontekstu, który zawiera Provider i Consumer (lub useContext hook-useContext(AnnouncementsContext) – hook do pobrania tych danych w komponentach, które są wewnątrz AnnouncementsProvider). Działa jak szablon, definiując mechanizm, dzięki któremu dane mogą być przekazywane przez drzewo komponentów.

// AnnouncementsProvider - komponent, który pobiera dane z API i udostępnia je przez AnnouncementsContext.Provider. Zarządza stanem i efektami ubocznymi, przygotowując dane dla AnnouncementsContext.Provider
export function AnnouncementsProvider({ children }) {
  const [announcements, setAnnouncements] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/announcements`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Cannot GET the announcements');
      })
      .then((data) => {
        console.log(data);
        console.log(import.meta.env.VITE_API_URL); // Sprawdzenie wartości zmiennej środowiskowej w konsoli przeglądarki
        setAnnouncements(data); // funkcja setAnnouncements aktualizuje stan announcements, który zostaje przekazany do komponentów podrzędnych Announcements i AnnouncementsDetails
      })
      .catch((error) => {
        console.log(error);
        setError(error); // funkcja setErrors aktualizuje stan error, który zostaje przekazany do komponentów podrzędnych Announcements i AnnouncementsDetails
      });
  }, []);

  return (
    // AnnouncementsContext.Provider - Jest odpowiedzialny za dostarczanie danych do komponentów podrzędnych, za pomocą właściwości value, a children określa, które z tych komponentów podrzędnych będą miały dostęp do tych przekazanych danych.
    <AnnouncementsContext.Provider value={{ announcements, error }}>
      {children}
    </AnnouncementsContext.Provider>
  );
}
