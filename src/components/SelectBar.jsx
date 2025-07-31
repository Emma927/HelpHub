import React, {useState} from 'react';
import Select from 'react-select';

/*React Select wewnętrznie:

-używa value jako klucza logicznego (do porównywania, śledzenia wybranego elementu),
-a label jest tym, co widzi użytkownik na ekranie.*/



const voivodeships = [
    { value: '', label: 'Wybierz województwo', isDisabled: true },
    { value: "dolnośląskie", label: "Dolnośląskie" },
    { value: "kujawsko-pomorskie", label: "Kujawsko-Pomorskie" },
    { value: "lubelskie", label: "Lubelskie" },
    { value: "lubuskie", label: "Lubuskie" },
    { value: "łódzkie", label: "Łódzkie" },
    { value: "małopolskie", label: "Małopolskie" },
    { value: "mazowieckie", label: "Mazowieckie" },
    { value: "opolskie", label: "Opolskie" },
    { value: "podkarpackie", label: "Podkarpackie" },
    { value: "podlaskie", label: "Podlaskie" },
    { value: "pomorskie", label: "Pomorskie" },
    { value: "śląskie", label: "Śląskie" },
    { value: "świętokrzyskie", label: "Świętokrzyskie" },
    { value: "warmińsko-mazurskie", label: "Warmińsko-Mazurskie" },
    { value: "wielkopolskie", label: "Wielkopolskie" },
    { value: "zachodniopomorskie", label: "Zachodniopomorskie" },
];


/*const voivodeships = ["dolnośląskie", "kujawsko-pomorskie", "lubelskie", "lubuskie", "łódzkie", "małopolskie", "mazowieckie", "opolskie", "podkarpackie", "podlaskie", "pomorskie", "śląskie", "świętokrzyskie", "warmińsko-mazurskie", "wielkopolskie", "zachodniopomorskie",];
//Osadzenie elementów tablicy voivodeships w drugiej zawierającej opcję domyślną dla Selecta. Dzięki temu mam tablicę z jednym elementem, a nie z dwoma: opcją domyślną i tablicą obiektów.
const voivodeshipsOptions = [
    { value: '', label: 'Wybierz województwo', isDisabled: true },
    ...voivodeships.map(w => ({ value: w, label: w }))
];*/

//option - wyświetlany jako property unused, ponieważ edytory kodu interpretują użycie kodu, a nie z faktycznego działania aplikacji.To klucz w obiekcie styles przekazywanym do react-select, który jest przypisany do funkcji definiującej style dla opcji. Funkcja ta przyjmuje dwa argumenty: provided (domyślne style) i state (stan opcji). Edytory kodu mogą oznaczać go jako "unused" z powodu ograniczeń w analizie statycznej.
//provided - zawiera domyślne style dla opcji, które można rozszerzyć lub nadpisać.
//state - obiekt w funkcji stylizującej react-select zawiera informacje o bieżącym stanie opcji
const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? '#d3bcb2' : '#ccc', // kolor obramowania
        boxShadow: state.isFocused ? '0 0 0 1px #8A7369' : 'none',
        '&:hover': {
            borderColor: '#8A7369',
        },
    }),
    option: (provided, state) => ({ //option - funkcja stylizująca, używana w bibliotece react-select
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

//1. Potrzebuje propsa voivodeship - dla wyboru województw - gdzie filtrować w Annoucements?
function SearchBar({ onSelectedVoivodeship }) {

    const [selectedOption, setSelectedOption] = useState(voivodeships[0]);

    /*- **Asynchroniczność**: setSelectedOption działa asynchronicznie, co oznacza, że zmiana stanu nie jest natychmiast widoczna w kodzie, który następuje bezpośrednio po wywołaniu setSelectedOption.
- **Aktualna wartość**: W momencie, gdy wywołujesz onSelectedVoivodeship(selectedOption);, selectedOption może jeszcze nie być zaktualizowane do nowej wartości, ponieważ React jeszcze nie przetworzył tej zmiany stanu.
### Jak sobie z tym poradzić?
Aby przekazać najnowszą wartość do onSelectedVoivodeship, powinieneś użyć wartości bezpośrednio z argumentu funkcji handleSelectChange, czyli option.value, jak było to pierwotnie:*/

    const handleSelectChange = (option) => {
        setSelectedOption(option);

        const { value } = option;
        if(typeof onSelectedVoivodeship === 'function') {
            onSelectedVoivodeship(value);
        }
    };

    return (
            <Select
                className="basic-single text-primary"
                classNamePrefix="select"
                defaultValue={voivodeships[0]}
                name="voivodeship"
                options={voivodeships}
                //### Podsumowanie:
                // W standardowym <select>, opcja nie jest obiektem, który zawiera właściwości jak w react-select. Jest to element DOM z atrybutem value i tekstem, który działa jako etykieta, co oznacza, że nie ma bezpośredniego odpowiednika dla label jako właściwości w obiekcie.
                value={selectedOption} //przekazanie wybranej opcji jako value, dzięki temu React-Select wie, który label wyświetlić w polu wyboru. Dzieje się to automatycznie, nie trzeba przypisywać ręcznie label jak w standardowym select
                //**Zawartość Parametru**: To, co react-select przekazuje jako argument do funkcji obsługującej zmianę (onChange), jest zawsze obiektem reprezentującym wybraną opcję. Obiekt ten ma strukturę zgodną z tym, co zdefiniowałeś w options (czyli zawiera value, label, itd.).
                onChange={handleSelectChange}  //react-select automatycznie przekazuje wybraną opcję jako argument do funkcji obsługującej zmianę. Można nazwać dowolnie, ale najłatwiej option
                styles={customStyles}
            />
    );
}

export default SearchBar;

/*W react-select, nie musisz ręcznie tworzyć elementów <option> i przypisywać im wartości oraz etykiet, ponieważ react-select automatycznie generuje te opcje na podstawie przekazanej tablicy options.
### Jak to działa w react-select:
1. **Tablica options**:
   - W react-select, przekazujesz tablicę obiektów jako options, gdzie każdy obiekt reprezentuje jedną opcję i zawiera przynajmniej właściwości value i label.
2. **Automatyczne Generowanie Opcji**:
   - react-select używa tej tablicy, aby automatycznie wygenerować listę opcji do wyboru. Każdy obiekt w tablicy options jest interpretowany jako opcja, gdzie label jest tym, co użytkownik widzi, a value jest tym, co jest zwracane przy wyborze.
### Przykład w react-select:
javascript
const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
];

<Select
    options={options}
    value={selectedOption}
    onChange={handleSelectChange}
/>
W tym przykładzie:
- options to tablica obiektów, gdzie każdy obiekt ma value i label.
- react-select automatycznie generuje interfejs wyboru na podstawie tej tablicy, więc nie musisz ręcznie definiować `*/