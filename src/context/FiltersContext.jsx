import React, { createContext, useState } from 'react';
// Globalny stan FiltersContext przechowuje stan filtrów na poziomie aplikacji, co oznacza, że jest on dostępny i zachowany niezależnie od tego, na której stronie aktualnie się znajduję.
export const FiltersContext = createContext();

// FiltersProvider - Jest komponentem, który dostarcza dane do komponentów podrzędnych.
export function FiltersProvider({ children }) {
  // selectedVoivodeship – przechowuje aktualnie wybrane województwo (dla SelectBar)
  // setSelectedVoivodeship – aktualizuje stan województwa
  const [selectedVoivodeship, setSelectedVoivodeship] = useState('all'); //Wartość value, którą przekazuje SelectBar, jest aktualizowana(odbierana) i przechowywana w stanie komponentu nadrzędnego FiltersContext.
  // selectedCategories – przechowuje listę aktywnych kategorii filtrowania (dla Filters)
  // setSelectedCategories – umożliwia dodanie lub usunięcie kategorii z listy
  const [selectedCategories, setSelectedCategories] = useState([]); // Pusta Tablica: Inicjalizuje stan bez wybranych kategorii
  // currentPage – przechowuje numer aktualnie wyświetlanej strony paginacji
  // setCurrentPage – aktualizuje stronę
  const [currentPage, setCurrentPage] = useState(1);

  return (
    // FiltersContext.Provider - Jest odpowiedzialny tylko za dostarczanie danych do komponentów podrzędnych. Jest to rzeczywisty komponent Provider stworzony przez createContext().
    // Dostarczenie danych do komponentów podrzędnych, za pomocą właściwości value, a children określa, które z tych komponentów podrzędnych będą miały dostęp do tych przekazanych danych.
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
