import React, { useContext } from 'react';
import { FiltersContext } from '@/context/FiltersContext'; //@ - zastępuje cały folder src, żeby nie musieć pisać ścieżek z dokłądną lokalizacją "./, ../../" itd.

const filterButtons = [
  {
    cat: 'clothesAndShoes',
    label: 'Odzież i obuwie',
  },
  {
    cat: 'accessories',
    label: 'Akcesoria',
  },
  {
    cat: 'urgent',
    label: 'Pilne',
  },
];

function Filters() {
  const { selectedCategories, setSelectedCategories } =
    useContext(FiltersContext);

  // toggleCategory – przełącza obecność kategorii w liście selectedCategories. Dodaje lub usuwa kategorię z aktywnych filtrów -  jeśli kategoria jest już na liście, zostaje usunięta, a jeśli jej nie ma, zostaje dodana.
  // cat - kategoria, którą chcę przełączyć (dodać lub usunąć z listy)
  // setSelectedCategories - to funkcja, która aktualizuje stan selectedCategories
  // prev reprezentuje poprzedni stan selectedCategories.
  // prev.includes(cat) - Sprawdza, czy cat już znajduje się w liście selectedCategories.
  // Operator warunkowy ? - Jeśli cat jest już w liście (prev.includes(cat) zwraca true), wykonuje prev.filter((c) => c !== cat).
  // Jeśli cat nie jest w liście (prev.includes(cat) zwraca false), wykonuje [...prev, cat].
  // prev.filter((c) => c !== cat) - Usuwa cat z listy. Tworzy nową listę, która zawiera wszystkie elementy z prev, z wyjątkiem cat
  // [...prev, cat] - Dodaje cat do listy. Tworzy nową listę, która zawiera wszystkie elementy z prev oraz dodaje cat na końcu
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  return (
    <div className="d-flex justify-content-center gap-3 mt-5">
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
