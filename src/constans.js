import image1 from '@/assets/clothes.jpg';
import image2 from '@/assets/accessories.jpg';
import image3 from '@/assets/food.jpg';

import {
  BsTwitterX,
  BsFacebook,
  BsInstagram,
  BsYoutube,
  BsWhatsapp,
  BsTiktok,
} from 'react-icons/bs';

export const API =
  import.meta.env.VITE_API_URL || 'https://help-hub-2sac.onrender.com'; // fallback — czyli wartość domyślna na wypadek, gdyby zmienna środowiskowa REACT_APP_API_URL nie była ustawiona

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
    image: image1,
  },
  {
    title: 'Akcesoria',
    description:
      'Zbiórka akcesoriów obejmuje wszystko, co może ułatwić codzienne życie: torby, plecaki, biżuterię, czapki, szaliki i inne dodatki. Każdy przedmiot może znaleźć nowego właściciela i stać się praktycznym wsparciem dla osób w potrzebie.',
    image: image2,
  },
  {
    title: 'Pilność',
    description:
      'Zbiórka dotyczy pilnych potrzeb, takich jak żywność, środki higieny osobistej, koce czy leki. Szybka pomoc jest kluczowa w sytuacjach kryzysowych, dlatego każda darowizna ma ogromne znaczenie. Wspólnie możemy pomóc tym, którzy potrzebują natychmiastowego wsparcia.',
    image: image3,
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

//control, option, singleValue, menu- wyświetlane jako property unused, ponieważ edytory kodu interpretują użycie kodu, a nie z faktycznego działania aplikacji.
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
        ? '#baa595' // kolor tła dla najechanej opcji, pochodzi tylko z klawiatury
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
    zIndex: 9999, // w razie problemów z dropdownem, aby był widoczny
  }),
};
