import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Collapse, Navbar, Nav, Container } from 'react-bootstrap';
import { MdDeviceHub } from 'react-icons/md';
import {
  BsHeartFill,
  BsPersonFill,
  BsChevronUp,
  BsChevronDown,
  BsBagHeartFill,
} from 'react-icons/bs';
import { UserContext } from '@/context/UserContext';
import { navSites } from '@/constans.js';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const openNav = () => setIsNavOpen(true);
  const closeNav = () => setIsNavOpen(false);
  const { user, logout } = useContext(UserContext);

  // Reset menu po zmianie strony- zamykanie menu po zmianie ścieżki przez użytkownika jako dodatkowe, automatyczne zabezpieczenie zamykania nawigacji. Bez useEffect też działa open/close ale wymaga interakcji użytkownika.
  useEffect(() => {
    setIsNavOpen(false); // Zamyka nawigację przy zmianie strony
  }, [location.pathname]);

  return (
    <header className="fixed-top shadow bg--fill">
      <div className="container d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center">
          <Link
            to="/"
            className="d-flex flex-column align-items-center text-decoration-none logo"
          >
            <MdDeviceHub className="logo-font--resp text-primary me-2" />
            <span className="fw-bold text-primary">HelpHub</span>
          </Link>

          {/* Dropdown strzałka toggle */}
          <button
            onMouseEnter={openNav}
            className="btn pl-2 border-0 text-primary"
            aria-controls="navbar-collapse"
            aria-expanded={isNavOpen}
            aria-label={
              isNavOpen ? 'Zamknij menu nawigacji' : 'Otwórz menu nawigacji'
            }
          >
            {isNavOpen ? (
              <BsChevronUp className="logo-chev--resp" />
            ) : (
              <BsChevronDown className="logo-chev--resp" />
            )}
          </button>
        </div>

        <nav className="d-flex align-items-center gap-4">
          {/*user ? '/favourites' : '/auth/user/login' - ten warunek sprawdza stan użytkownika w momencie kliknięcia przycisku i decyduje, dokąd użytkownik powinien zostać przekierowany*/}
          <button
            className="fav__heart"
            onClick={() => navigate(user ? '/favourites' : '/auth/user/login')}
          >
            <BsHeartFill />
          </button>

          {user ? (
            <>
              <button
                className="btn btn-primary btn--rounded"
                onClick={() => navigate('/favourites')}
              >
                <BsPersonFill size={17} className="text-secondary" />
                <span className="font--resp text-secondary mx-1 btn--text">
                  Zalogowany
                </span>
              </button>
              <button
                className="btn btn-danger btn--rounded"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                <BsPersonFill size={17} className="text-secondary" />
                <span className="font--resp text-secondary mx-1 btn--text">
                  Wyloguj się
                </span>
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary btn--rounded"
              onClick={() => navigate('/auth/user/login')}
            >
              <BsPersonFill size={17} className="text-secondary" />
              <span className="font--resp text-secondary mx-1 btn--text">
                Zaloguj się
              </span>
            </button>
          )}

          {!user && (
            <button className="btn btn-primary btn--rounded" disabled>
              <BsBagHeartFill size={17} className="text-secondary" />
              <span className="font--resp text-secondary mx-1 btn--text">
                Zaloguj się
              </span>
            </button>
          )}
        </nav>
      </div>

      {/* Navbar z React-Bootstrap w Collapse */}
      <Collapse
        in={isNavOpen} //Collapse pojawi się jeśli isNavOpen ma wartość true, a ona jest nadawana przez najechanie myszką i zmianę stanu
        onMouseLeave={closeNav} // dodanie obsługi opuszczenia myszą
      >
        <div id="navbar-collapse">
          <Navbar className="font--resp" expand="md">
            <Container className>
              {/* Gdy użytkownik kliknie na NavLink, React Router zmienia aktualną ścieżkę URL na tę określoną w atrybucie "to".*/}
              <Nav className="gap-3">
                {navSites.map(({ name, path }) => (
                  <NavLink
                    key={path}
                    // NavLink zmienia podstronę bez przeładowania
                    // Sprawdza, czy path jest "/", jeśli tak, używa tylko "/", w przeciwnym razie dodaje nazwę ścieżki path
                    to={path === '/' ? path : `/${path}`}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {name}
                  </NavLink>
                ))}
                {/*isActive Jest to parametr przekazywany do funkcji className w NavLink, który informuje, czy dany link jest aktualnie aktywny (czy jego ścieżka pasuje do bieżącej lokalizacji).*/}
              </Nav>
            </Container>
          </Navbar>
        </div>
      </Collapse>
    </header>
  );
}

export default Header;
