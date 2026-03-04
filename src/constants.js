import image1 from '@/assets/clothes.webp';
import image2 from '@/assets/accessories.webp';
import image3 from '@/assets/food.webp';

import {
  BsTwitterX,
  BsFacebook,
  BsInstagram,
  BsYoutube,
  BsWhatsapp,
  BsTiktok,
} from 'react-icons/bs';

// API endpoint (fallback used if VITE_API_URL is not set)
export const API =
  import.meta.env.VITE_API_URL || 'https://help-hub-2sac.onrender.com';

export const SOCIAL_MEDIA_SITES = [
  {
    icon: BsFacebook,
    address: 'https://www.facebook.com/helphub',
    label: 'Facebook naszej firmy',
  },
  {
    icon: BsTwitterX,
    address: 'https://www.x.com/helphub',
    label: 'X naszej firmy',
  },
  {
    icon: BsInstagram,
    address: 'https://www.instagram.com/helphub',
    label: 'Instagram naszej firmy',
  },
  {
    icon: BsYoutube,
    address: 'https://www.youtube.com/helphub',
    label: 'Youtube naszej firmy',
  },
  {
    icon: BsWhatsapp,
    address: 'https://www.whatsapp.com/helphub',
    label: 'Whatsapp naszej firmy',
  },
  {
    icon: BsTiktok,
    address: 'https://www.tiktok.com/helphub',
    label: 'TikTok naszej firmy',
  },
];

// Cards displayed in the app
export const CARDS = [
  {
    title: 'Odzież i obuwie',
    description:
      'Zbiórka odzieży i obuwie w dobrym stanie, aby pomóc osobom w trudnej sytuacji życiowej. Każda para spodni, bluzka czy buty mogą znacząco poprawić komfort życia potrzebujących. Przyjmujemy zarówno letnie, jak i zimowe ubrania dla dorosłych i dzieci.',
    image: image1,
  },
  {
    title: 'Akcesoria',
    description:
      'Zbiórka akcesoriów obejmuje wszystko, co może ułatwić codzienne życie: przybory kuchenne, torby, plecaki, biżuterię, czapki, szaliki, książki, zeszyty, długopisy i inne dodatki. Każdy przedmiot może znaleźć nowego właściciela i stać się praktycznym wsparciem dla osób w potrzebie.',
    image: image2,
  },
  {
    title: 'Pilność',
    description:
      'Zbiórka dotyczy pilnych potrzeb, takich jak żywność, środki higieny osobistej, koce czy leki. Szybka pomoc jest kluczowa w sytuacjach kryzysowych, dlatego każda darowizna ma ogromne znaczenie. Wspólnie możemy pomóc tym, którzy potrzebują natychmiastowego wsparcia.',
    image: image3,
  },
];

export const FAQ = [
  {
    question: 'Kim jesteśmy?',
    answer:
      'HelpHub– to centralna aplikacja ogłoszeniowa, która łączy użytkowników ze wszystkimi organizacjami, instytucjami, schroniskami, prywatnymi działalnościami przeprowadzającymi zbiórki ubrań, akcesoriów i żywności w jednym miejscu. Umożliwia przeglądanie ogłoszeń o organizowanych zbiórkach przez wszystkie organizacje pomocowe w Polsce.',
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

export const NAV_SITES = [
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

// 'value' is used as a URL-safe technical slug, matching 'voivodeshipSlug' in db.json
export const VOIVODESHIPS = [
  {
    value: 'all',
    label: 'Wybierz województwo',
    isDisabled: true,
  },
  {
    value: 'dolnoslaskie',
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
    value: 'lodzkie',
    label: 'Łódzkie',
  },
  {
    value: 'malopolskie',
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
    value: 'slaskie',
    label: 'Śląskie',
  },
  {
    value: 'swietokrzyskie',
    label: 'Świętokrzyskie',
  },
  {
    value: 'warminsko-mazurskie',
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

export const FILTER_BUTTONS = [
  {
    cat: 'odziez-i-obuwie',
    label: 'Odzież\ni Obuwie',
  },
  {
    cat: 'akcesoria',
    label: 'Akcesoria',
  },
  {
    cat: 'pilne',
    label: 'Pilne',
  },
];

export const POSSIBILITIES = [
  'Licznik ulubionych ofert w nagłówku strony (header), widoczny po zalogowaniu,',
  'Rejestracja i logowanie dla organizacji pomocowych, ',
  'Indywidualne zamieszczenie ogłoszeń przez wszystkich organizatorów zbiórek,',
  'Filtrowanie ogłoszeń po dodatkowych kategoriach,',
  'Formularz płatności,',
  'Możliwość wyboru języka polski /angielski itd.,',
  'Wersja HelpHub_v2.0 – aplikacja z obsługą zbiórek dla zwierząt i przeglądania ogłoszeń adopcji zwierząt w granicach Polski.',
];

// customStyles for react-select: not a simple constant or static data
// This is a configuration object with functions used by react-select
// to dynamically style the control, options, selected value, and menu.
export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#d3bcb2' : '#ccc', // border color on focus
    boxShadow: state.isFocused ? '0 0 0 1px #8A7369' : 'none', // shadow on focus
    '&:hover': {
      borderColor: '#8A7369',
    },
  }),
  option: (provided, state) => ({
    // option - styles for individual options in the react-select dropdown
    ...provided,
    backgroundColor: state.isSelected
      ? '#8A7369' // selected option
      : state.isFocused
        ? '#baa595' // hovered option (only from keyboard focus)
        : null,
    color: state.isSelected || state.isFocused ? 'white' : '#8A7369', // text color
    '&:hover': {
      backgroundColor: '#baa595',
      color: 'white',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#5c5050', // selected value in input
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999, // ensures dropdown is visible
  }),
};
