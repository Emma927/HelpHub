import React, { useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { BsCaretRightFill, BsHeartFill } from 'react-icons/bs';
import { AnnouncementsContext } from '@/context/AnnouncementsContext'; // To, że filtry się nie resetują po powrocie z AnnouncementDetails, wynika z faktu, że cały stan FiltersContext jest trzymany globalnie, w providerze, który otacza całą aplikację (czyli App w main.jsx)
import { useFavourite } from '@/hook/useFavourite';

function AnnouncementDetails() {
  const { announcements, error } = useContext(AnnouncementsContext);
  const { id } = useParams();
  // Wyrażenie funkcyjne za pomocą find- sprawdza warunek: jeśli id elementu jest równe temu z adresu URL (useParams()), to jest to szukane ogłoszenie. Jeśli znajdzie pasujący element, można dokonać destrukturyzacji jego właściwości, a jeśli nie znajdzie, find zwróci undefined.
  const announcement =
    announcements && announcements.find((item) => item.id === id);

  const { isFaved, toggleFav } = useFavourite(id); // Sprawdza, czy ogłoszenie o danym id jest ulubione (isFaved), oraz do przełączania tego stanu (toggleFav). Przkeazane jest id klikniętego ogłoszenia

  if (error) {
    return <div>Błąd ładowania</div>;
  }

  if (!announcements) {
    return (
      <div className="text-primary logo-font--resp">
        Trwa ładowanie danych...
      </div>
    );
  }
  if (!announcement) {
    return (
      <div className="text-primary logo-font--resp text-danger">
        Nie znaleziono ogłoszenia
      </div>
    );
  }

  // Destrukturyzacja danych dla pojedynczego ogłoszenia
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
            E-mail: <a href={email}>{email}</a>
          </p>
          <p>
            Strona internetowa: <a href={website}>{website}</a>
          </p>
          <p>
            Koniec zbiórki: <span>{deadline}</span>
          </p>
          <button
            className={`fav__heart ${isFaved ? 'fav__heart--active' : ''}`}
            onClick={toggleFav}
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
      {/*Jeśli jest jakakolwiek szansa, że faq może być undefined, null, albo API nie zwróci tego pola — jest zabezpieczenie: (faq && ...), dopóki nie mam pewności, że dane istnieją.*/}
      {faq &&
        faq.map(({ question, answer }, index) => (
          <div key={index} className="mb-4">
            <p className="mb-2 font-weight-bold">Pytanie: {question}</p>
            <p className="mb-3">Odpowiedź: {answer}</p>
          </div>
        ))}
      <div className="d-flex justify-content-center">
        <NavLink
          to="/announcements"
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
