import React, { useContext } from 'react';
import Select from 'react-select';
import { FiltersContext } from '@/context/FiltersContext';
import { voivodeships, customStyles } from '@/constants.js';

/**
 * SelectBar - komponent wyboru województwa.
 * - Pobiera aktualną wartość selectedVoivodeship oraz funkcję setSelectedVoivodeship z FiltersContext.
 * - Ustawia domyślną opcję na podstawie wartości w stanie kontekstu lub pierwszej opcji z listy.
 * - Aktualizuje stan w FiltersContext przy zmianie wyboru przez użytkownika.
 */
function SelectBar() {
  const { selectedVoivodeship, setSelectedVoivodeship } =
    useContext(FiltersContext);

  // defaultOption - ustala domyślną opcję na podstawie wartości selectedVoivodeship, która jest przekazywana z FiltersContext. Jeśli selectedVoivodeship nie odpowiada żadnej opcji, wybiera pierwszą opcję z listy constants.
  const defaultOption =
    voivodeships.find((opt) => opt.value === selectedVoivodeship) ||
    voivodeships[0];

  // handleSelectChange - funkcja, która jest wywoływana, gdy użytkownik dokonuje wyboru w komponencie SelectBar
  const handleSelectChange = (option) => {
    const { value } = option;
    setSelectedVoivodeship(value);
  };

  return (
    <Select
      className="basic-single text-primary w-100"
      value={defaultOption}
      name="voivodeship"
      options={voivodeships}
      onChange={handleSelectChange}
      styles={customStyles}
    />
  );
}

export default SelectBar;
