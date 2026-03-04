import { useSearchParams } from 'react-router-dom';
import { FiltersContext } from './FiltersContext';

/**
 * FiltersProvider - Manages global filtering and pagination via URL.
 * Uses URL as "Single Source of Truth" to ensure state persistence on refresh.
 */
export function FiltersProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Derived State: Synchronized directly with URL parameters.
  const selectedVoivodeship = searchParams.get('voivodeship') || 'all';
  // Safe parsing: Optional chaining prevents .split() errors if 'categories' is missing.
  const selectedCategories = searchParams.get('categories')?.split(',') || [];
  const currentPage = parseInt(searchParams.get('page')) || 1;

  // Updates the voivodeship filter and resets pagination to the first page.
  const changeVoivodeship = (value) => {
    // Create a new instance as a copy of current searchParams to maintain immutability.
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('voivodeship'); // Remove param when 'all' is selected.
    } else {
      params.set('voivodeship', value); // Updates the URL key with the selected region
    }

    params.delete('page'); // Reset to page 1 on filter change.
    setSearchParams(params); // Updates all filters
  };

  // Toggle category (add or remove) and reset pagination.
  const toggleCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    const categories = params.get('categories')?.split(',') || [];

    if (categories.includes(cat)) {
      const updated = categories.filter((c) => c !== cat);
      if (updated.length > 0) {
        params.set('categories', updated.join(',')); // Presets categories params
      } else {
        params.delete('categories'); // Delete categories params
      }
    } else {
      params.set('categories', [...categories, cat].join(','));
    }

    params.delete('page'); // Always reset to page 1 when filters change to avoid showing empty results.
    setSearchParams(params); // Trigger URL update and component re-render.
  };

  // Clear all filters by resetting URL parameters to an empty state.
  const resetAllFilters = () => {
    const params = new URLSearchParams(); // Creates an empty object of params
    setSearchParams(params);
  };

  // Update 'page' parameter in URL; remove it if returning to page 1 for cleaner URLs.
  const setPage = (page) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page);
    }
    setSearchParams(params);
  };

  return (
    <FiltersContext.Provider
      value={{
        selectedVoivodeship,
        selectedCategories,
        currentPage,
        changeVoivodeship,
        toggleCategory,
        resetAllFilters,
        setCurrentPage: setPage,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
