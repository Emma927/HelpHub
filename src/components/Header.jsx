import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Collapse, Navbar, Nav, Container } from 'react-bootstrap';
import { MdDeviceHub } from 'react-icons/md';
import {
  BsHeartFill,
  BsPersonFill,
  BsChevronUp,
  BsChevronDown,
  BsBagHeartFill,
} from 'react-icons/bs';
import { useUser } from '@/contexts/userContext/useUser';
import { NAV_SITES } from '@/constants.js';
import DeleteAccountButton from '@/user/DeleteAccountButton';

/**
 * Header component managing top navigation, user authentication state,
 * and responsive dropdown menu.
 */
function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const openNav = () => setIsNavOpen(true);
  const closeNav = () => setIsNavOpen(false);
  const { user, logout } = useUser();

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

          {/* Navigation Toggle Button */}
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
          {/* Protected route logic: Redirect guests to login */}
          <button
            className="fav__heart"
            onClick={() => navigate(user ? '/favourites' : '/login')}
          >
            <BsHeartFill />
          </button>

          {user ? (
            <>
              {/* Navigation Toggle Button */}
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

              <DeleteAccountButton />
            </>
          ) : (
            /* Guest Login Button */
            <button
              className="btn btn-primary btn--rounded"
              onClick={() => navigate('/login')}
            >
              <BsPersonFill size={17} className="text-secondary" />
              <span className="font--resp text-secondary mx-1 btn--text">
                Zaloguj się
              </span>
            </button>
          )}

          {/* Button reserved for future help organization features */}
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

      {/* Expandable Navigation Menu */}
      <Collapse in={isNavOpen} onMouseLeave={closeNav}>
        <div id="navbar-collapse">
          <Navbar className="font--resp" expand="md">
            <Container className>
              <Nav className="gap-3">
                {NAV_SITES.map(({ name, path }) => (
                  <NavLink
                    key={path}
                    to={path === '/' ? path : `/${path}`}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={closeNav}
                  >
                    {name}
                  </NavLink>
                ))}
              </Nav>
            </Container>
          </Navbar>
        </div>
      </Collapse>
    </header>
  );
}

export default Header;
