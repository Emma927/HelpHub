import {
  BsTwitterX,
  BsFacebook,
  BsInstagram,
  BsYoutube,
  BsWhatsapp,
  BsTiktok,
} from 'react-icons/bs';

export const socialMediaSites = [
  {
    icon: BsFacebook,
    address: 'https://www.facebook.com/helpchain',
    label: 'Facebook naszej firmy',
  },
  {
    icon: BsTwitterX,
    address: 'https://www.x.com/helpchain',
    label: 'X naszej firmy',
  },
  {
    icon: BsInstagram,
    address: 'https://www.instagram.com/helpchain',
    label: 'Instagram naszej firmy',
  },
  {
    icon: BsYoutube,
    address: 'https://www.youtube.com/helpchain',
    label: 'Youtube naszej firmy',
  },
  {
    icon: BsWhatsapp,
    address: 'https://www.whatsapp.com/helpchain',
    label: 'Whatsapp naszej firmy',
  },
  {
    icon: BsTiktok,
    address: 'https://www.tiktok.com/helpchain',
    label: 'TikTok naszej firmy',
  },
];

export const cards = [
  {
    title: 'Odzież i obuwie',
    description:
      'Zbiórka odzieży i obuwie w dobrym stanie, aby pomóc osobom w trudnej sytuacji życiowej. Każda para spodni, bluzka czy buty mogą znacząco poprawić komfort życia potrzebujących. Przyjmujemy zarówno letnie, jak i zimowe ubrania dla dorosłych i dzieci.',
    image: 'src/assets/clothes.jpg',
  },
  {
    title: 'Akcesoria',
    description:
      'Zbiórka akcesoriów obejmuje wszystko, co może ułatwić codzienne życie: torby, plecaki, biżuterię, czapki, szaliki i inne dodatki. Każdy przedmiot może znaleźć nowego właściciela i stać się praktycznym wsparciem dla osób w potrzebie.',
    image: 'src/assets/accessories.jpg',
  },
  {
    title: 'Pilność',
    description:
      'Zbiórka dotyczy pilnych potrzeb, takich jak żywność, środki higieny osobistej, koce czy leki. Szybka pomoc jest kluczowa w sytuacjach kryzysowych, dlatego każda darowizna ma ogromne znaczenie. Wspólnie możemy pomóc tym, którzy potrzebują natychmiastowego wsparcia.',
    image: 'src/assets/food.jpg',
  },
];

export const faq = [
  {
    question: 'Kim jesteśmy?',
    answer:
      'HelpHub– to centralna aplikacja ogłoszeniowa, która łączy użytkowników ze wszystkimi organizacjami, instytucjami, schroniskami, prywatnymi działalnościami przeprowadzającymi zbiórki ubrań i akcesoriów w jednym miejscu. Umożliwia przeglądanie ogłoszeń o organizowanych zbiórkach przez wszystkie organizacje pomocowe w Polsce.',
    number: 1,
  },
  {
    question: 'Czy sami oragnizujemy zbiórki?',
    answer: 'Nie, my tworzy jeden punkt ogłoszeń dla zbiórek.',
    number: 2,
  },
  {
    question: 'Czy aplikacja jest bezpłatna?',
    answer: 'Tak. Nie pobieramy płatności za korzystanie z aplikacji',
    number: 3,
  },
  {
    question:
      'Kiedy pojawi się nowa wersja aplikacji z możliwością dodawania ogłoszeń?',
    answer: 'Najnowsze informacje będziemy publikowali w Nowościach',
    number: 4,
  },
];

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
    name: 'O nas',
    path: 'about',
  },
];

export const voivodeships = [
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

export const filterButtons = [
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

export const possibilities = [
  'Licznik ulubionych ofert w nagłówku strony (header), widoczny po zalogowaniu,',
  'Rejestracja i logowanie dla organizacji pomocowych, ',
  'Indywidualne zamieszczenie ogłoszeń przez wszystkich organizatorów zbiórek,',
  'Filtrowanie ogłoszeń po dodatkowych kategoriach,',
  'Formularz płatności,',
  'Możliwość wyboru języka polski /angielski itd.,',
  'Wersja HelpHub_v2.0 – aplikacja z obsługą zbiórek dla zwierząt i przeglądania ogłoszeń adopcji zwierząt w granicach Polski.',
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

/*Właściwości takie jak control, option, singleValue, i menu w obiekcie customStyles są używane przez bibliotekę react-select do nadpisywania domyślnych stylów komponentu. Oto dlaczego edytor ich nie oznacza jako nieużywane:
1. **Specyficzne API:** Te właściwości są częścią specyficznego API react-select do dostosowywania wyglądu komponentu. react-select oczekuje, że obiekt stylów będzie zawierał te właściwości i używa ich wewnętrznie, gdy renderuje komponent.
2. **Dynamiczne użycie:** Właściwości te są dynamicznie używane przez react-select w momencie, gdy komponent jest renderowany, nawet jeśli w kodzie nie widać bezpośrednich odniesień do nich.
3. **Integracja z biblioteką:** Edytory kodu, takie jak Visual Studio Code, mogą nie oznaczać tych właściwości jako nieużywane, ponieważ są one częścią konwencji używanej przez zewnętrzną bibliotekę. Edytor rozpoznaje, że są one wykorzystywane w kontekście tej biblioteki.
Podsumowując, właściwości te są używane zgodnie z oczekiwaniami react-select, mimo że nie są bezpośrednio wywoływane w Twoim kodzie. Dlatego edytor nie oznacza ich jako nieużywane.*/