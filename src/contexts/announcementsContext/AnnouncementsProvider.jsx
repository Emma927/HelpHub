import { useState, useEffect } from 'react';
import { API } from '@/constants.js';
import { AnnouncementsContext } from './AnnouncementsContext';

/**
 * AnnouncementsProvider - Manages global announcement data fetching.
 * - Fetches all announcements from the API on initial mount.
 * - Provides data and error states via AnnouncementsContext.
 */
export function AnnouncementsProvider({ children }) {
  const [announcements, setAnnouncements] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController could be added here to cancel the request if component unmounts
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${API}/announcements`);
        if (!response.ok) {
          throw new Error('Cannot GET the announcements');
        }
        const data = await response.json();
        console.log(data);
        console.log(import.meta.env.VITE_API_URL); // Sprawdzenie wartości zmiennej środowiskowej w konsoli przeglądarki
        setAnnouncements(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchAnnouncements()
      .catch((error) => console.error(error));
  }, []);

  return (
    <AnnouncementsContext.Provider value={{ announcements, error }}>
      {children}
    </AnnouncementsContext.Provider>
  );
}