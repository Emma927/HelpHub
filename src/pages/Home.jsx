import { NavLink } from 'react-router-dom';
import { BsCaretRightFill } from 'react-icons/bs';
import { Card } from 'react-bootstrap';
import { cards } from '@/constants.js';

/**
 * Komponent strony głównej.
 * - Wyświetla nagłówki i hasła motywacyjne.
 * - Zawiera przycisk prowadzący do strony ogłoszeń.
 * - Renderuje zestaw kart informacyjnych z danych z `cards`.
 */
function Home() {
  return (
    <section className="section__home">
      <div className="h-100 d-flex flex-column justify-content-center align-items-center text-primary">
        <h1 className="text-uppercase fw-bold text-center mb-0">
          Twoje centrum dobra
        </h1>
        <p className="text-center font--resp my-1 fw-bold">
          Łączymy pomoc z potrzebą w jednym miejscu.
        </p>
        <p className="text-center font--resp my-1 fw-bold">
          Wpieraj. Pomagaj. Łącz się.
        </p>
        <div className="w-100 d-flex justify-content-center pt-2 pb-4">
          <NavLink
            to="/announcements"
            className="btn--welcome d-flex justify-content-center align-items-center font--resp my-2 text-decoration-none"
          >
            <BsCaretRightFill size={25} className="arrow" />
            Przejdź do ogłoszeń i dołącz się do naszej misji!
          </NavLink>
        </div>
      </div>
      <div className="container  mb-5 mt-2 my-2">
        <div className="row g-3">
          {cards.map(({ title, description, image }, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <Card className="shadow border-0 font--resp">
                <div className="card-img-container">
                  <Card.Img variant="top" src={image} loading="lazy" />
                </div>
                <Card.Body className="d-flex flex-column mt-2">
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
