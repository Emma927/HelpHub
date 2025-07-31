// components/AnnouncementCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsHeartFill, BsCaretRightFill } from 'react-icons/bs';

function AnnouncementCard({ announcement, numberOfCards }) {
  const {
    id,
    title,
    voivodeship,
    category: { clothesAndShoes, accessories, urgent },
    deadline,
    datePosted,
    imageUrl,
    imageAlt,
  } = announcement;

  // Dodanie klasy zależnie od liczby kart
  const additionalClass =
    numberOfCards === 1 ? 'only-card' : numberOfCards === 2 ? 'two-cards' : '';

  //albo:
  // Dodanie klasy zależnie od liczby kart
  /*let additionalClass = '';
  if (numberOfCards === 1) {
      additionalClass = 'only-card';
  } else if (numberOfCards === 2) {
      additionalClass = 'two-cards';
  }*/

  return (
    <div
      key={id}
      className={`col-12 col-md-6 col-lg-4 card-custom ${additionalClass}`}
    >
      <Card className="shadow border-0 font--resp">
        <div className="card-img-container">
          <Card.Img variant="top" src={imageUrl} alt={imageAlt} />
        </div>
        <Card.Body className="announcements__info d-flex flex-column mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <p>
              Data dodania: <span>{datePosted}</span>
            </p>
            <button
              // onClick={openFavourites}
              className="fav__heart"
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
