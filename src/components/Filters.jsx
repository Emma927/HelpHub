import React, { useContext } from 'react';
import { FiltersContext } from '@/context/FiltersContext'; //@ - zastępuje cały folder src, żeby nie musieć pisać ścieżek z dokłądną lokalizacją "./, ../../" itd.
import { filterButtons } from '@/constans.js';

function Filters() {
  const { selectedCategories, setSelectedCategories } =
    useContext(FiltersContext);

  // toggleCategory – przełącza obecność kategorii w liście selectedCategories. Dodaje lub usuwa kategorię z aktywnych filtrów. Jeśli kategoria jest już na liście, zostaje usunięta, a jeśli jej nie ma, zostaje dodana.
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  return (
    <div className="d-flex justify-content-center gap-3 mt-5">
      {/*Jeśli kategoria jest zaznaczona dostaję klasę aktywnych filtrów, key={cat} Używa cat jako klucza dla każdego elementu przycisku*/}
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
