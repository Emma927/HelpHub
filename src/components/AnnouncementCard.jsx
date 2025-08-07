import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsHeartFill, BsCaretRightFill } from 'react-icons/bs';
import { useFavourite } from '@/hook/useFavourite';

function AnnouncementCard({ announcement, numberOfCards, onToggleFav }) {
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

  // Przekazanie zmiennej id do hooka useFavourite, która reprezentuje identyfikator ogłoszenia, to wartość, a nie nazwa zmiennej, id identyfikuje, które ogłoszenie jest obsługiwane
  const { isFaved, toggleFav } = useFavourite(id);

  // Dodanie klasy zależnie od liczby kart
  let additionalClass = ''; // Na początek brak dodatkowej klasy
  if (numberOfCards === 1) {
    additionalClass = 'only-card';
  } else if (numberOfCards === 2) {
    additionalClass = 'two-cards';
  }

  // handleToggle- wywoływana po kliknięciu, celem tej funkcji jest zsynchronizowanie zmian stanu ulubionych ogłoszeń zarówno lokalnie, jak i z komponentem nadrzędnym.
  function handleToggle() {
    // Funkcja handleToggle nie potrzebuje bezpośrednio id jako argumentu, ponieważ toggleFav wewnątrz hooka useFavourite już wie, które ogłoszenie jest obsługiwane dzięki przekazanemu wcześniej id.
    toggleFav(); // Zmienia stan ulubionego ogłoszenia w localStorage i aktualizuje lokalny stan isFaved w hooku useFavourite
    if (onToggleFav) {
      onToggleFav(); // Jest funkcją przekazywaną jako prop do AnnouncementCard z FavouriteAnnouncements. Jej celem jest powiadomienie komponentu nadrzędnego FavouriteAnnouncements, że stan ulubionego ogłoszenia się zmienił. Komponent nadrzędny musi zareagować na tę zmianę, przez aktualizację listy ulubionych ogłoszeń za pomocą funkcji updateFavs().
    }
  }

  return (
    <div
      key={id}
      className={`col-12 col-md-6 col-lg-4 card-custom ${additionalClass}`}
    >
      <Card className="shadow border-0 font--resp card__announcement">
        <div className="card-img-container">
          <Card.Img variant="top" src={imageUrl} alt={imageAlt} />
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
            {/*operator && zwraca wartość po prawej stronie, jeśli wartość po lewej jest prawdziwa*/}
            <span>
              {[
                clothesAndShoes && 'Odzież i obuwie',
                accessories && 'Akcesoria',
                urgent && 'Pilne',
              ]
                .filter(Boolean) // usuwa wartości false/null
                .map((category) => ` ${category}`) // dodaje spację przed każdą nazwą
                // join- dodaje przecinek, jeśli będzie dołączona kolejna kategoria
                .join(', ')}
            </span>
          </p>
          <p>
            Koniec zbiórki: <span>{deadline}</span>
          </p>
          {/*Dzięki mapowaniu tworzone są NavLinki dla każdego ogłoszenia z przypisanym id*/}
          <NavLink
            to={`/announcements/${id}`}
            className="btn--welcome d-flex justify-content-center align-items-center font--resp mt-auto text-decoration-none"
          >
            {/*mt-auto - zmusza element, żeby przesunął się na dół kontenera, jeśli reszta przestrzeni jest wolna. Ale uwaga – działa tylko w kontekście flexboxa w kolumnie. mt-auto mówi: "zajmij całe wolne miejsce między mną a poprzednim elementem"*/}
            <BsCaretRightFill size={25} className="arrow" />
            Czytaj więcej
          </NavLink>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AnnouncementCard;
