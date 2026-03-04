import { useContext } from 'react';
import { FiltersContext } from './FiltersContext';

/**
 * Custom hook to access FiltersContext.
 * Ensures the hook is used within a FilterProvider to prevent null context errors.
 */
export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters musi być użyty wewnątrz FiltersProvider!');
  }
  return context;
};
