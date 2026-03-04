import { useContext } from 'react';
import { AnnouncementsContext } from './AnnouncementsContext';

/**
 * Custom hook to access AnnouncementsContext.
 * Ensures the hook is used within a AnnouncementsProvider to prevent null context errors.
 */
export const useAnnouncements = () => {
  const context = useContext(AnnouncementsContext);
  if (!context) {
    throw new Error(
      'useAnnouncements musi być użyty wewnątrz AnnouncementsProvider!',
    );
  }
  return context;
};
