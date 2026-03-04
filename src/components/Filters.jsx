import { useFilters } from '@/contexts/filtersContext/useFilters';
import { FILTER_BUTTONS } from '@/constants.js';

/**
 * Filters component:
 * - Manages category filtering via global FiltersContext.
 * - Renders interactive filter buttons based on pre-defined constants.
 * - Supports multi-selection logic for category filtering.
 */
function Filters() {
  const { selectedCategories, toggleCategory } = useFilters();

  return (
    <div className="d-flex justify-content-center gap-3 mt-5">
      {FILTER_BUTTONS.map(({ cat, label }) => (
        <button
          key={cat} // Efficient list reconciliation using unique category ID
          className={`btn--welcome announcements__filters ${selectedCategories.includes(cat) ? 'announcements__filters--active' : ''}`} // Dynamic class binding based on active state
          onClick={() => toggleCategory(cat)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default Filters;
