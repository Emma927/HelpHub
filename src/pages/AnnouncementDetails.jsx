import { useParams, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { BsCaretRightFill, BsHeartFill } from 'react-icons/bs';
import { useAnnouncements } from '@/contexts/announcementsContext/useAnnouncements';
import { useUser } from '@/contexts/userContext/useUser';
import { useFavourite } from '@/hook/useFavourite';

// Displays detailed information about a single announcement based on URL ID
function AnnouncementDetails({ listType: propListType = 'all' }) {
  const { announcements, error } = useAnnouncements();
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  // Handle navigation origin and scroll position
  const listType = location.state?.listType || propListType;

  // Ensure the page starts at the top when navigating to details
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { isFaved, toggleFav } = useFavourite(id);
  // Find announcement and manage favorites
  const announcement =
    announcements && announcements.find((item) => item.id === id);

  function handleToggleFav() {
    if (!user) {
      navigate('/login');
      return;
    }
    toggleFav();
  }

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
    <section className="announcement__details font--resp text-primary">
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
            {/* Link using the mailto: protocol to open default mail client */}
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
      {/* Render FAQ if data is available */}
      {faq &&
        faq.map(({ question, answer }, index) => (
          <div key={index} className="mb-4">
            <p className="mb-2 font-weight-bold">Pytanie: {question}</p>
            <p className="mb-3">Odpowiedź: {answer}</p>
          </div>
        ))}
      <div className="d-flex justify-content-center">
        {/* Back button with location state preservation */}
        <NavLink
          to={
            location.state?.from ||
            (listType === 'favourites' ? '/favourites' : '/announcements')
          }
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
