import { useState, useCallback } from 'react';
import { useUser } from '@/contexts/userContext/useUser';
import { parseFavsFromLocalStorage } from '@/utils/parseFavsFromLocalStorage';

/**
 * Hook useFavourite manages the favorite status of a single announcement.
 * - Handles persistence in localStorage.
 * - Optimized with lazy initialization and useCallback.
 */
export function useFavourite(announcementId) {
  const { user } = useUser();

  // LAZY INITIALIZER: Calculates initial state only once during mounting.
  // This prevents cascading renders ( via useState in useEffect ) and ensures state is ready immediately.
  const [isFaved, setIsFaved] = useState(() => {
    if (!user) return false;
    const favs = parseFavsFromLocalStorage(user.id);
    // .includes() returns a boolean (true/false) indicating if the ID is in favorites
    const isInitiallyFaved = favs.includes(announcementId);
    return isInitiallyFaved;
  });

  /**
   * toggleFav – switches the favorite status.
   * useCallback ensures function stability between renders.
   */
  const toggleFav = useCallback(() => {
    if (!user) return;
    const favs = parseFavsFromLocalStorage(user.id);
    const isCurrentlyFaved = favs.includes(announcementId);
    const updated = isCurrentlyFaved
      ? favs.filter((id) => id !== announcementId)
      : [...favs, announcementId];

    // Persist updated list to localStorage
    localStorage.setItem(`favs_${user.id}`, JSON.stringify(updated));
    // Update local state to trigger UI re-render
    setIsFaved(!isCurrentlyFaved);
  }, [user, announcementId]);

  return { isFaved, toggleFav };
}
