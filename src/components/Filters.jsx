import { useFilters } from '@/context/FiltersContext';
import { filterButtons } from '@/constants.js';

/**
 * Komponent `Filters`
 * - Wyświetla zestaw przycisków kategorii (zdefiniowanych w `filterButtons`).
 * - Umożliwia użytkownikowi aktywację/dezaktywację kategorii filtrowania.
 * - Aktualizuje globalny stan filtrów przez `FiltersContext`.
 */
function Filters() {
  const { selectedCategories, setSelectedCategories } = useFilters();

  // Przełącza obecność kategorii w liście aktywnych filtrów. Jeśli kategoria jest już na liście, zostaje usunięta, a jeśli jej nie ma, zostaje dodana.
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  return (
    <div className="d-flex justify-content-center gap-3 mt-5">
      {/*Jeśli kategoria jest zaznaczona, dostaje klasę aktywnych filtrów. key={cat} używa cat jako klucza dla każdego elementu przycisku*/}
      {filterButtons.map(({ cat, label }) => (
        <button
          key={cat}
          className={`btn--welcome announcements__filters ${selectedCategories.includes(cat) ? 'announcements__filters--active' : ''}`}
          onClick={() => toggleCategory(cat)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default Filters;
