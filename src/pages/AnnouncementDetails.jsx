import {
  useParams,
  useSearchParams,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import { BsCaretRightFill, BsHeartFill } from 'react-icons/bs';
import { useAnnouncements } from '@/context/AnnouncementsContext'; // Kontekst przechowujący dane ogłoszeń (lista, błędy, stan ładowania). Dzięki temu komponenty w aplikacji mają dostęp do tych samych danych bez przekazywania propsów.
import { useUser } from '@/context/UserContext';
import { useFavourite } from '@/hook/useFavourite';

/**
 * Komponent wyświetlający szczegóły pojedynczego ogłoszenia.
 * - Pobiera identyfikator ogłoszenia z adresu URL i wyszukuje je w kontekście `AnnouncementsContext`.
 * - Prezentuje wszystkie informacje o ogłoszeniu: organizację, opis, lokalizację, dane kontaktowe, daty i zdjęcie.
 * - Pozwala użytkownikowi dodać lub usunąć ogłoszenie z ulubionych (tylko po zalogowaniu).
 * - Obsługuje brak danych (ładowanie, błędy, brak ogłoszenia).
 * - Umożliwia powrót do listy ogłoszeń lub ulubionych (z zachowaniem numeru strony w paginacji).
 */
function AnnouncementDetails({ listType = 'all' }) {
  const { announcements, error } = useAnnouncements();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1; // odczyt strony
  const { user } = useUser();
  const navigate = useNavigate();

  // Szuka w tablicy ogłoszeń elementu, którego id zgadza się z parametrem URL
  const announcement =
    announcements && announcements.find((item) => item.id === id);

  // Hook obsługujący ulubione – sprawdza, czy ogłoszenie jest już dodane do ulubionych(isFaved), i umożliwia zmianę tego stanu(toggleFav)
  const { isFaved, toggleFav } = useFavourite(id);

  /**
   * Obsługuje kliknięcie ikony "serca":
   * - jeśli użytkownik nie jest zalogowany → przenosi do strony logowania,
   * - w przeciwnym razie przełącza stan ulubionych dla tego ogłoszenia.
   */
  function handleToggleFav() {
    if (!user) {
      navigate('/login');
      return; // Wykonanie funkcji zatrzyma się, jeśli użytkownik nie jest zalogowany
    }
    toggleFav();
  }

  // Jeśli podczas pobierania danych z kontekstu wystąpił błąd → pokaż komunikat o błędzie
  if (error) {
    return <div>Błąd ładowania</div>;
  }

  // Jeśli dane ogłoszeń jeszcze nie zostały pobrane → wyświetl informację o trwającym ładowaniu
  if (!announcements) {
    return (
      <div className="text-primary logo-font--resp">
        Trwa ładowanie danych...
      </div>
    );
  }

  // Jeśli żadne ogłoszenie nie pasuje do id z URL → poinformuj użytkownika, że ogłoszenie nie zostało znalezione
  if (!announcement) {
    return (
      <div className="text-primary logo-font--resp text-danger">
        Nie znaleziono ogłoszenia
      </div>
    );
  }

  // Destrukturyzacja danych pojedynczego ogłoszenia – dla czytelności i łatwiejszego użycia w JSX
  const {
    title,
    organizationName,
    description,
    voivodeship,
    city,
    contact: { phone, email, website },
    address,
    datePosted,
    deadline,
    imageUrl,
    imageAlt,
    faq,
  } = announcement;

  return (
    <section className="announcement__details mx-5 font--resp my-2 text-primary">
      <div className="announcements__info d-flex flex-column">
        <h2>Szczegóły ogłoszenia:</h2>
        <p>
          Data dodania: <span>{datePosted}</span>
        </p>
        <div className="d-flex flex-column align-items-start mb-2">
          <p>
            Nazwa organizacji: <span>{organizationName}</span>
          </p>
          <p>
            Województwo: <span>{voivodeship}</span>
          </p>
          <p>
            Miasto: <span>{city}</span>
          </p>
          <p>
            Adres: <span>{address}</span>
          </p>
          <p>
            Telefon: <span>{phone}</span>
          </p>
          <p>
            {/*mailto: – pozwala otworzyć klienta pocztowego po kliknięciu w adres*/}
            E-mail: <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p>
            Strona internetowa: <a href={website}>{website}</a>
          </p>
          <p>
            Koniec zbiórki: <span>{deadline}</span>
          </p>
          <button
            className={`fav__heart ${isFaved ? 'fav__heart--active' : ''}`}
            onClick={handleToggleFav}
          >
            <BsHeartFill />
          </button>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="announcement__details-img"
        />
        <h3 className="mt-3">{title}</h3>
      </div>
      <p className="mb-3">{description}</p>
      {/* Jeśli jest jakakolwiek szansa, że faq może być undefined, null, albo API nie zwróci tego pola — jest zabezpieczenie: (faq && ...), dopóki nie mam pewności, że dane istnieją.*/}
      {faq &&
        faq.map(({ question, answer }, index) => (
          <div key={index} className="mb-4">
            <p className="mb-2 font-weight-bold">Pytanie: {question}</p>
            <p className="mb-3">Odpowiedź: {answer}</p>
          </div>
        ))}
      <div className="d-flex justify-content-center">
        {/* Link powrotny – kieruje użytkownika do listy ogłoszeń lub ulubionych,
    zachowując numer strony przekazany w parametrze URL */}
        <NavLink
          to={{
            pathname:
              listType === 'favourites' ? '/favourites' : '/announcements',
            search: page ? `?page=${page}` : '',
          }}
          className="btn--welcome fw-normal text-secondary mb-3 font--back text-decoration-none"
        >
          <BsCaretRightFill size={25} className="arrow" />
          Powrót do ogłoszeń
        </NavLink>
      </div>
    </section>
  );
}

export default AnnouncementDetails;
