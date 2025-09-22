import { Card } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsHeartFill, BsCaretRightFill } from 'react-icons/bs';
import { useFavourite } from '@/hook/useFavourite';
import { useUser } from '@/context/UserContext';

/**
 * Komponent `AnnouncementCard` wyświetla pojedyncze ogłoszenie.
 * - Prezentuje tytuł, daty, województwo, kategorie i obrazek.
 * - Obsługuje dodawanie/odejmowanie ogłoszenia z ulubionych
 *   (zależnie od zalogowania użytkownika).
 * - Pozwala przejść do szczegółów ogłoszenia przez `NavLink`.
 *
 * Props:
 * - `announcement` – dane ogłoszenia,
 * - `numberOfCards` – do zmiany układu karty,
 * - `onToggleFav` – callback informujący komponent nadrzędny o zmianie ulubionych,
 * - `currentPage` – numer strony (dodawany do linku),
 * - `listType` – typ listy (wszystkie / ulubione).
 */
function AnnouncementCard({
  announcement,
  numberOfCards,
  onToggleFav,
  currentPage,
  listType = 'all',
}) {
  const {
    id,
    title,
    voivodeship,
    category: { clothesAndShoes, accessories, urgent }, // Destrukturyzacja wewnętrzna
    deadline,
    datePosted,
    imageUrl,
    imageAlt,
  } = announcement;

  const { isFaved, toggleFav } = useFavourite(id);
  const { user } = useUser();
  const navigate = useNavigate();

  // Dodanie klasy zależnie od liczby kart
  let additionalClass = ''; // Na początek brak dodatkowej klasy
  if (numberOfCards === 1) {
    additionalClass = 'only-card';
  } else if (numberOfCards === 2) {
    additionalClass = 'two-cards';
  }

  function handleToggle() {
    if (!user) {
      navigate('/login');
      return;
    }

    toggleFav(); // Zmienia stan ulubionego ogłoszenia w localStorage i aktualizuje lokalny stan isFaved w hooku useFavourite
    if (typeof onToggleFav === 'function') {
      onToggleFav();
    }
  }

  return (
    <div className={`col-12 col-md-6 col-lg-4 card-custom ${additionalClass}`}>
      <Card className="shadow border-0 font--resp card__announcement">
        <div className="card-img-container">
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={imageAlt}
            loading="lazy"
          />
        </div>
        <Card.Body className="announcements__info d-flex flex-column mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <p>
              Data dodania: <span>{datePosted}</span>
            </p>
            <button
              className={`fav__heart ${isFaved ? 'fav__heart--active' : ''}`}
              onClick={handleToggle}
            >
              <BsHeartFill />
            </button>
          </div>
          <p>
            Województwo: <span>{voivodeship}</span>
          </p>
          <h5 className="font__card-resp">{title}</h5>
          <p>
            Kategoria zbiórki:
            {/*Operator && zwraca wartość po prawej stronie, jeśli wartość po lewej jest prawdziwa*/}
            <span>
              {[
                clothesAndShoes && 'Odzież i obuwie',
                accessories && 'Akcesoria',
                urgent && 'Pilne',
              ]
                .filter(Boolean) // Usuwa wartości false/null
                .map((category) => ` ${category}`) // Dodaje spację przed każdą nazwą
                // join- dodaje przecinek, jeśli będzie dołączona kolejna kategoria
                .join(', ')}
            </span>
          </p>
          <p>
            Koniec zbiórki: <span>{deadline}</span>
          </p>
          {/*Dzięki mapowaniu tworzone są NavLinki dla każdego ogłoszenia z przypisanym id*/}
          <NavLink
            to={`/${listType === 'favourites' ? 'favourites' : 'announcements'}/${id}${currentPage ? `?page=${currentPage}` : ''}`}
            className="btn--welcome d-flex justify-content-center align-items-center font--resp mt-auto text-decoration-none"
          >
            {/*mt-auto - zmusza element, żeby przesunął się na dół kontenera, jeśli reszta przestrzeni jest wolna.*/}
            <BsCaretRightFill size={25} className="arrow" />
            Czytaj więcej
          </NavLink>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AnnouncementCard;
