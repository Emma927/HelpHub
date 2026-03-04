import { Card } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsHeartFill, BsCaretRightFill } from 'react-icons/bs';
import { useFavourite } from '@/hook/useFavourite';
import { useUser } from '@/contexts/userContext/useUser';
import { FILTER_BUTTONS } from '@/constants';

/**
 * AnnouncementCard component:
 * - Renders individual announcement details using React-Bootstrap Card.
 * - Handles favorite toggling logic with authentication check.
 * - Provides dynamic routing to details page with navigation state preservation.
 */
function AnnouncementCard({ announcement, onToggleFav, listType }) {
  const {
    id,
    title,
    voivodeship,
    category,
    deadline,
    datePosted,
    imageUrl,
    imageAlt,
  } = announcement;

  const { isFaved, toggleFav } = useFavourite(id);
  const { user } = useUser();
  const navigate = useNavigate();

  /**
   * Handles adding/removing from favorites.
   * Redirects unauthorized users to the login page.
   */
  function handleToggle() {
    if (!user) {
      navigate('/login');
      return;
    }

    toggleFav(); // Persists the change in localStorage and updates the local heart icon state
    if (typeof onToggleFav === 'function') {
      // Executes the callback passed by the parent to signal that local data has changed.
      // It notifies the parent  to re-sync its state with localStorage
      onToggleFav();
    }
  }

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Card className="shadow border-0 font--resp">
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
            <span>
              {category
                .map((catValue) => {
                  // Searches for a category object in constants that matches the announcement's category key
                  const found = FILTER_BUTTONS.find(
                    (btn) => btn.cat === catValue,
                  );
                  // Formats the label by removing line breaks ( '/n' used in filter buttons)
                  // to ensure consistent single-line text alignment in the card.
                  return found
                    ? ` ${found.label.replace('\n', ' ')}`
                    : ` ${catValue}`;
                })
                .join(', ')}
            </span>
          </p>
          <p>
            Koniec zbiórki: <span>{deadline}</span>
          </p>
          {/* Navigation Logic: 
  - Preserves all active URL search parameters (filters, pagination) 
    to maintain the user's context when returning from the details view.
  - Passes 'listType' and 'from' in state for smart "Go Back" functionality.*/}
          <NavLink
            to={{
              pathname: `/announcements/${id}`,
              // Appends the current query string (filters + pagination) to the URL.
              // This allows the Details view to maintain the user's browsing context.
              search: window.location.search,
            }}
            state={
              listType === 'favourites'
                ? {
                    listType: 'favourites',
                    from: `${window.location.pathname}${window.location.search}`,
                  }
                : undefined // If undefined, listType is overridden by the default 'all' fallback in AnnouncementDetails
            }
            // mt-auto: pushes the button to the bottom of the card by absorbing available vertical space in the flex container
            className="btn--welcome d-flex justify-content-center align-items-center font--resp mt-auto text-decoration-none"
          >
            <BsCaretRightFill size={25} className="arrow" />
            Czytaj więcej
          </NavLink>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AnnouncementCard;
