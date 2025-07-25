import { NavLink, useNavigate } from "react-router-dom";
import { BsCaretRightFill } from "react-icons/bs";
import { Card } from 'react-bootstrap';

function Home({ onNavigate, voivodeship, clothesAndShoes, accessories, urgent, filteredAnnouncements }) {

    const cards = [
        {
            title: "Odzież i obuwie",
            description: "Zbiórka odzieży i obuwie w dobrym stanie, aby pomóc osobom w trudnej sytuacji życiowej. Każda para spodni, bluzka czy buty mogą znacząco poprawić komfort życia potrzebujących. Przyjmujemy zarówno letnie, jak i zimowe ubrania dla dorosłych i dzieci.",
            image: "src/assets/clothes.jpg",
            filteredCategory: clothesAndShoes
        },
        {
            title: "Akcesoria",
            description: "Zbiórka akcesoriów obejmuje wszystko, co może ułatwić codzienne życie: torby, plecaki, biżuterię, czapki, szaliki i inne dodatki. Każdy przedmiot może znaleźć nowego właściciela i stać się praktycznym wsparciem dla osób w potrzebie.",
            image: "src/assets/accessories.jpg",
            filteredCategory: accessories
        },
        {
            title: "Pilność",
            description: "Zbiórka dotyczy pilnych potrzeb, takich jak żywność, środki higieny osobistej, koce czy leki. Szybka pomoc jest kluczowa w sytuacjach kryzysowych, dlatego każda darowizna ma ogromne znaczenie. Wspólnie możemy pomóc tym, którzy potrzebują natychmiastowego wsparcia.",
            image: "src/assets/food.jpg",
            filteredCategory: urgent
        }
    ];

    const navigate = useNavigate();

    //category w JSON jest obiektem, a nie stringiem. Jednak w kontekście funkcji handleFilterClick, zakładamy, że category jest przekazywane jako string reprezentujący jedną z właściwości tego obiektu, a nie cały obiekt.
    const handleFilterClick = (filteredCategory) => {
        navigate(`/announcements?category=${filteredCategory}`);
    };
    //  - Użycie category jako parametru zapytania w URL pozwala na przekazanie informacji o tym, jak chcesz filtrować dane na stronie. Na przykład, jeśli chcesz wyświetlić tylko ogłoszenia związane z ubraniami, możesz użyć /announcements-list_and_details?category=clothesAndShoes.

    const category = [clothesAndShoes, accessories, urgent];

    //Nie wiem czy to będzie
    function handleFilterVoi() {
        setVoivodeship(voivodeship)
    }

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
                <p className="text-center font--resp my-1 fw-bold">Wpieraj. Pomagaj. Łącz się.</p>
                {/* SearchBar ponad napisem */}
                <div className="w-100 d-flex justify-content-center pt-2 pb-4">
                    <NavLink to="/announcements"
                             className="btn--welcome font--resp text-center my-2 text-decoration-none">
                        <BsCaretRightFill size={25} className="arrow"/>
                        Przejdź do ogłoszeń i dołącz się do naszej misji!
                    </NavLink>
                </div>
            </div>
            <div className="container mb-5 my-2">
                <div className="row g-3 justify-content-center">
                    {cards.map(({ title, description, image }, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4">
                            <Card className="shadow border-0 font--resp">
                                <div className="card-img-container">
                                    <Card.Img variant="top" src={image}/>
                                </div>
                                <Card.Body className="d-flex flex-column mt-2">
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Text>
                                        {description}
                                    </Card.Text>
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