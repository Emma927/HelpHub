export const navSites = [
  {
    name: 'Strona główna',
    path: '/',
  },
  {
    name: 'Ogłoszenia',
    path: 'announcements',
  },
  {
    name: 'Nowości',
    path: 'news',
  },
  {
    name: 'Inicjatywy',
    path: 'initiatives',
  },
  {
    name: 'O nas',
    path: 'about',
  },
];

export const constans = [
  {
    value: 'all',
    label: 'Wybierz województwo',
    isDisabled: true,
  },
  {
    value: 'dolnośląskie',
    label: 'Dolnośląskie',
  },
  {
    value: 'kujawsko-pomorskie',
    label: 'Kujawsko-Pomorskie',
  },
  {
    value: 'lubelskie',
    label: 'Lubelskie',
  },
  {
    value: 'lubuskie',
    label: 'Lubuskie',
  },
  {
    value: 'łódzkie',
    label: 'Łódzkie',
  },
  {
    value: 'małopolskie',
    label: 'Małopolskie',
  },
  {
    value: 'mazowieckie',
    label: 'Mazowieckie',
  },
  {
    value: 'opolskie',
    label: 'Opolskie',
  },
  {
    value: 'podkarpackie',
    label: 'Podkarpackie',
  },
  {
    value: 'podlaskie',
    label: 'Podlaskie',
  },
  {
    value: 'pomorskie',
    label: 'Pomorskie',
  },
  {
    value: 'śląskie',
    label: 'Śląskie',
  },
  {
    value: 'świętokrzyskie',
    label: 'Świętokrzyskie',
  },
  {
    value: 'warmińsko-mazurskie',
    label: 'Warmińsko-Mazurskie',
  },
  {
    value: 'wielkopolskie',
    label: 'Wielkopolskie',
  },
  {
    value: 'zachodniopomorskie',
    label: 'Zachodniopomorskie',
  },
];

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#d3bcb2' : '#ccc', // kolor obramowania
    boxShadow: state.isFocused ? '0 0 0 1px #8A7369' : 'none',
    '&:hover': {
      borderColor: '#8A7369',
    },
  }),
  option: (provided, state) => ({
    //option - funkcja stylizująca, używana w bibliotece react-select
    ...provided,
    backgroundColor: state.isSelected
      ? '#8A7369' // kolor tła dla wybranej opcji
      : state.isFocused
        ? '#baa595' // kolor tła dla najechanej opcji, pochodzi tylko z klawiatury. Opcja aktualnie wybrana przez klawiaturę. Fokus występuje, gdy element jest aktywny i gotowy do interakcji, np. gdy użytkownik przechodzi między opcjami za pomocą klawiatury (np. klawiszem Tab lub strzałkami).
        : null,
    color: state.isSelected || state.isFocused ? 'white' : '#8A7369', // kolor tekstu
    '&:hover': {
      backgroundColor: '#baa595',
      color: 'white',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#5c5050', // kolor wybranej opcji w inpucie (po kliknięciu)
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999, // w razie problemów z dropdownem
  }),
};


//option - wyświetlany jako property unused, ponieważ edytory kodu interpretują użycie kodu, a nie z faktycznego działania aplikacji.To klucz w obiekcie styles przekazywanym do react-select, który jest przypisany do funkcji definiującej style dla opcji. Funkcja ta przyjmuje dwa argumenty: provided (domyślne style) i state (stan opcji). Edytory kodu mogą oznaczać go jako "unused" z powodu ograniczeń w analizie statycznej.
//provided - domyślne style, zawiera domyślne style dla opcji, które można rozszerzyć lub nadpisać.
//state - stan opcji, obiekt w funkcji stylizującej react-select zawiera informacje o bieżącym stanie opcji
/*1. **control**:
- **Opis**: Funkcja stylizująca dla głównego kontenera selektora (czyli miejsca, gdzie użytkownik klika, aby otworzyć menu rozwijane).
- **Argumenty**: provided (domyślne style) i state (stan selektora, np. czy jest skupiony).
- **Dlaczego**: Pozwala dostosować wygląd kontenera, np. zmieniać kolor obramowania, gdy selektor jest skupiony.
2. **option**:
- **Opis**: Funkcja stylizująca dla poszczególnych opcji w menu rozwijanym.
- **Argumenty**: provided i state (zawiera informacje o tym, czy opcja jest zaznaczona, skupiona itp.).
- **Dlaczego**: Umożliwia dostosowanie wyglądu opcji, np. zmieniając tło i kolor tekstu w zależności od interakcji użytkownika.
3. **singleValue**:
- **Opis**: Funkcja stylizująca dla wybranej wartości, która jest wyświetlana w control po dokonaniu wyboru.
- **Argumenty**: provided.
- **Dlaczego**: Pozwala na dostosowanie wyglądu tekstu wybranej opcji, np. zmieniając jego kolor.
4. **menu**:
- **Opis**: Funkcja stylizująca dla całego menu rozwijanego, które pojawia się po kliknięciu w control.
- **Argumenty**: provided.
- **Dlaczego**: Umożliwia dostosowanie wyglądu menu, np. ustawiając zIndex, aby menu nie było zasłonięte przez inne elementy strony.
Każda z tych funkcji pozwala na rozszerzenie lub nadpisanie domyślnych stylów dostarczanych przez react-select, co daje dużą elastyczność w dostosowywaniu wyglądu komponentu do specyficznych potrzeb projektu.*/