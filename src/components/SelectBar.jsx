import Select from 'react-select';
import { useFilters } from '@/contexts/filtersContext/useFilters';
import { VOIVODESHIPS, customStyles } from '@/constants.js';

/**
 * SelectBar - Voivodeship selection component.
 * - Synchronizes with FiltersContext for global filtering.
 * - Handles default state based on URL/Context search parameters.
 */
function SelectBar() {
  const { selectedVoivodeship, changeVoivodeship } = useFilters();

  // Find the active option based on current filter state, fallback to first option.
  const defaultOption =
    VOIVODESHIPS.find((opt) => opt.value === selectedVoivodeship) ||
    VOIVODESHIPS[0];

  // Update global filter state on user selection.
  const handleSelectChange = (option) => {
    const { value } = option;
    changeVoivodeship(value);
  };

  return (
    <Select
      className="basic-single text-primary w-100"
      value={defaultOption}
      name="voivodeship"
      options={VOIVODESHIPS}
      onChange={handleSelectChange}
      styles={customStyles} // customStyles imported from constants.js
    />
  );
}

export default SelectBar;
