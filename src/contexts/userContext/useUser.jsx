import { useContext } from 'react';
import { UserContext } from './UserContext';

/**
 * Custom hook to access UserContext.
 * Ensures the hook is used within a UserProvider to prevent null context errors.
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser musi być użyty wewnątrz UserProvider!');
  }
  return context;
};
