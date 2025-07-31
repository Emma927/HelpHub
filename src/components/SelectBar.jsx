import React, { useContext } from 'react';
import Select from 'react-select';
import { FiltersContext } from '@/context/FiltersContext';
import { voivodeships, customStyles } from '@/database/voivodeships';

function SelectBar() {
  //  selectedVoivodeship - Aktualnie wybrana wartość, przekazywana z komponentu nadrzędnego FiltersContext
  //  setSelectedVoivodeship - Funkcja do aktualizacji stanu w komponencie nadrzędnym FiltersContext
  const { selectedVoivodeship, setSelectedVoivodeship } =
    useContext(FiltersContext);

  // defaultOption - Ustala domyślną opcję na podstawie wartości selectedVoivodeship, która jest przekazywana z FiltersContext. Jeśli selectedVoivodeship nie odpowiada żadnej opcji, wybiera pierwszą opcję z listy voivodeships.
  const defaultOption =
    voivodeships.find((opt) => opt.value === selectedVoivodeship) ||
    voivodeships[0];

  // handleSelectChange - Funkcja, która jest wywoływana, gdy użytkownik dokonuje wyboru w komponencie SelectBar
  const handleSelectChange = (option) => {
    // Parametr option - Funkcja onChange w react-select przyjmuje jako argument obiekt reprezentujący wybraną opcję. Ten obiekt zawiera zazwyczaj klucze value i label, które odpowiadają wartości i etykiecie wybranej opcji.
    const { value } = option;
    setSelectedVoivodeship(value);
  };

  // Komponent Select - Używa defaultValue do ustawienia początkowej wartości wyboru.
  // onChange jest ustawione na handleSelectChange, aby reagować na zmiany wyboru
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
