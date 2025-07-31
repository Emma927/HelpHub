import { NavLink } from 'react-router-dom';
import { BsCaretRightFill } from 'react-icons/bs';
import { Card } from 'react-bootstrap';

function Home() {
  const cards = [
    {
      title: 'Odzież i obuwie',
      description:
        'Zbiórka odzieży i obuwie w dobrym stanie, aby pomóc osobom w trudnej sytuacji życiowej. Każda para spodni, bluzka czy buty mogą znacząco poprawić komfort życia potrzebujących. Przyjmujemy zarówno letnie, jak i zimowe ubrania dla dorosłych i dzieci.',
      image: 'src/assets/clothes.jpg',
    },
    {
      title: 'Akcesoria',
      description:
        'Zbiórka akcesoriów obejmuje wszystko, co może ułatwić codzienne życie: torby, plecaki, biżuterię, czapki, szaliki i inne dodatki. Każdy przedmiot może znaleźć nowego właściciela i stać się praktycznym wsparciem dla osób w potrzebie.',
      image: 'src/assets/accessories.jpg',
    },
    {
      title: 'Pilność',
      description:
        'Zbiórka dotyczy pilnych potrzeb, takich jak żywność, środki higieny osobistej, koce czy leki. Szybka pomoc jest kluczowa w sytuacjach kryzysowych, dlatego każda darowizna ma ogromne znaczenie. Wspólnie możemy pomóc tym, którzy potrzebują natychmiastowego wsparcia.',
      image: 'src/assets/food.jpg',
    },
  ];

  return (
    <section className="section__home">
      {/* Container z treścią */}
      <div className="h-100 align-items-center text-primary">
        <h1 className="text-uppercase fw-bold text-center mb-0">
          Twoje centrum dobra
        </h1>
        <p className="text-center font--resp my-1 fw-bold">
          Łączymy pomoc z potrzebą w jednym miejscu.
        </p>
        <p className="text-center font--resp my-1 fw-bold">
          Wpieraj. Pomagaj. Łącz się.
        </p>
        {/* SelectBar ponad napisem */}
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
      <div className="container mb-5 my-2">
        <div className="row g-3">
          {cards.map(({ title, description, image }, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <Card className="shadow border-0 font--resp">
                <div className="card-img-container">
                  <Card.Img variant="top" src={image} />
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
