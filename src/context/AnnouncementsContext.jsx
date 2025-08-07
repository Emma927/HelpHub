import React, { createContext, useState, useEffect } from 'react';
import { API } from '@/constans.js';

/*### Rola createContext():
- **Tworzenie struktury:**
  - createContext() tworzy obiekt kontekstu, który zawiera Provider i Consumer (lub useContext hook). Działa jak szablon, definiując mechanizm, dzięki któremu dane mogą być przekazywane przez drzewo komponentów.
- **Provider i Consumer:**
  - **Provider:** Jest komponentem, który dostarcza dane do komponentów podrzędnych. W przypadku AnnouncementsContext, rzeczywistym komponentem jest AnnouncementsContext.Provider, ale często opakowujemy go w funkcję lub komponent o nazwie AnnouncementsProvider, aby ułatwić jego użycie i zarządzanie stanem.
  - **Consumer (lub useContext hook):** Jest używany przez komponenty do uzyskiwania dostępu do danych z kontekstu. Consumer jest komponentem, który używa render prop do przekazywania danych, natomiast useContext jest hookiem, który bezpośrednio zwraca wartości kontekstu w komponentach funkcyjnych.
Twoje wyjaśnienie jest poprawne, ale dodanie kontekstu, dlaczego opakowujemy Provider oraz różnice w użyciu Consumer i useContext, może uczynić je bardziej kompletnym.*/

// Tworzenie kontekstu dla ogłoszeń
export const AnnouncementsContext = createContext();

// AnnouncementsProvider - Jest to komponent, który może zawierać dodatkową logikę, taką jak zarządzanie stanem, efekty uboczne (np. pobieranie danych z API), czy inne operacje, które są potrzebne do przygotowania danych przed ich przekazaniem do Provider.

// AnnouncementsProvider - Zarządza stanem i efektami ubocznymi, przygotowując dane dla AnnouncementsContext.Provider
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
    // AnnouncementsContext.Provider - Jest odpowiedzialny tylko za dostarczanie danych do komponentów podrzędnych. Jest to rzeczywisty komponent Provider stworzony przez createContext().
    // Dostarczenie danych do komponentów podrzędnych, za pomocą właściwości value, a children określa, które z tych komponentów podrzędnych będą miały dostęp do tych przekazanych danych.
    <AnnouncementsContext.Provider value={{ announcements, error }}>
      {children}
    </AnnouncementsContext.Provider>
  );
}
