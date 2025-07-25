import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from "react-router-dom";
import { Collapse, Navbar, Nav, Container } from 'react-bootstrap';
import { MdDeviceHub } from 'react-icons/md';
import { BsHeartFill, BsPersonFill, BsChevronUp, BsChevronDown, BsBagHeartFill } from 'react-icons/bs';


export const navSites = [
    {
        name: "Ogłoszenia",
        path: "announcements-list_and_details"
    },
    {
        name: "Nowości",
        path: "news"
    },
    {
        name: "Inicjatywy",
        path: "initiatives"
    },
    {
        name: "O nas",
        path: "about"
    },
];

function Header() {
    const [isFavourite, setIsFavourite] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation();
    const openNav = () => setIsNavOpen(true);
    const closeNav = () => setIsNavOpen(false);
    const openFavourites = () => setIsFavourite(prev => !prev);


    // RESET menu po zmianie strony - // Zamykanie menu przy zmianie ścieżki - jako dodatkowe zabezpieczenie automatycznego zamykania nawigacji po zmianie ścieżki przez użytkownika, bez useEffect też działa open/close ale wymaga interakcji użytownika
    useEffect(() => { //zamyka nawigację po przejsciu ze strony głównej na wsyzstkie podstrony. Po wybraniu podstrony z tabeli też zamyka nawigację
        setIsNavOpen(false); // zamyka przy zmianie strony
    }, [location.pathname]);

    return (
        <header className="fixed-top shadow bg--fill">
            <div className="container d-flex align-items-center justify-content-between h-100">
                <div className="d-flex align-items-center">
                    <Link to="/" className="d-flex flex-column align-items-center text-decoration-none logo">
                        <MdDeviceHub className="logo-font--resp text-primary me-2"/>
                        <span className="fw-bold text-primary">HelpHub</span>
                    </Link>

                    {/* Dropdown strzałka toggle */}
                    <button
                        onMouseEnter={openNav}
                        className="btn pl-2 border-0 text-primary"
                        aria-controls="navbar-collapse"
                        //aria-controls = wskazuje, który element jest kontrolowany (kodowo)
                        aria-expanded={isNavOpen}
                        aria-label={isNavOpen ? "Zamknij menu nawigacji" : "Otwórz menu nawigacji"}
                    >
                        {isNavOpen ? (
                            <BsChevronUp className="logo-chev--resp"/>
                        ) : (
                            <BsChevronDown className="logo-chev--resp"/>
                        )}
                    </button>
                </div>

                <nav className="d-flex align-items-center gap-4">
                    <button
                        onClick={openFavourites}
                        className="fav__heart"
                    >
                        <BsHeartFill />
                    </button>
                    <button
                        className="btn btn-primary px-3 py-2 rounded-pill d-none d-lg-block">
                        <BsPersonFill size={17} className="text-secondary"/>
                        <span className="font--resp text-secondary mx-1">Zaloguj się</span>
                    </button>

                    <button
                        className="btn btn-primary px-3 py-2 rounded-pill d-none d-lg-block"
                        disabled>
                        <BsBagHeartFill size={17} className="text-secondary"/>
                        <span className="font--resp text-secondary mx-1">Zaloguj się</span>
                    </button>
                </nav>
            </div>

            {/* Navbar z React-Bootstrap w Collapse */}
            <Collapse
                in={isNavOpen} //Collapse pojawi się jeśli isNavOpen ma wartość true, a ona jest nadawana przez najechanie myszką i zmianę stanu
                onMouseLeave={closeNav}  // dodanie obsługi opuszczenia myszą
            >
                <div id="navbar-collapse">
                    <Navbar className="font--resp" expand="md">
                        <Container className>
                            {/* Gdy użytkownik kliknie na NavLink, React Router zmienia aktualną ścieżkę URL na tę określoną w atrybucie to.*/}
                            <Nav className="gap-3">
                                {navSites.map(({ name, path }) => (
                                    <NavLink
                                        key={path}
                                       //NavLink zmienia podstronę bez przeładowania
                                        to={`/${path}`}
                                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
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