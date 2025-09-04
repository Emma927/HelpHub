import React, { createContext, useState } from 'react';
// Globalny stan FiltersContext przechowuje stan filtrów na poziomie aplikacji, co oznacza, że jest on dostępny i zachowany niezależnie od tego, na której stronie aktualnie się znajduję.
export const FiltersContext = createContext();

/**
 * Provider `FiltersProvider` zarządza globalnym stanem filtrów.
 * - Przechowuje:
 *    - `selectedVoivodeship` – aktualnie wybrane województwo,
 *    - `selectedCategories` – listę aktywnych kategorii,
 *    - `currentPage` – numer bieżącej strony w paginacji.
 * - Udostępnia funkcje do aktualizacji każdego ze stanów.
 * - Dzięki kontekstowi dane filtrów są dostępne w całej aplikacji
 *   (np. w `Announcements` czy `Filters`).
 */
export function FiltersProvider({ children }) {
  const [selectedVoivodeship, setSelectedVoivodeship] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <FiltersContext.Provider
      value={{
        selectedVoivodeship,
        setSelectedVoivodeship,
        selectedCategories,
        setSelectedCategories,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
