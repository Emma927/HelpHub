import SearchBar from "@/components/SearchBar"; //  import SearchBar
//@ zastępuje cały folder src, żeby nie musieć pisać ścieżek z dokłądną lokalizacją ./, ../../ itd.
import Button from 'react-bootstrap/Button';
import {Card} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Filters({ onNavigate, voivodeship, clothesAndShoes, accessories, urgent, filteredAnnouncements }) {

    const cards = [
        {
            title: "Odzież i obuwie",
            description: "Zbieramy odzież i obuwie w dobrym stanie, aby pomóc osobom w trudnej sytuacji życiowej. Każda para spodni, bluzka czy buty mogą znacząco poprawić komfort życia potrzebujących. Przyjmujemy zarówno letnie, jak i zimowe ubrania dla dorosłych i dzieci.",
            image: "src/assets/clothes.jpg",
            filteredCategory: clothesAndShoes
        },
        {
            title: "Akcesoria",
            description: "“Zbiórka akcesoriów obejmuje wszystko, co może ułatwić codzienne życie: torby, plecaki, biżuterię, czapki, szaliki i inne dodatki. Każdy przedmiot może znaleźć nowego właściciela i stać się praktycznym wsparciem dla osób w potrzebie.",
            image: "src/assets/accessories.jpg",
            filteredCategory: accessories
        },
        {
            title: "Pilność",
            description: "Ta zbiórka dotyczy pilnych potrzeb, takich jak żywność, środki higieny osobistej, koce czy leki. Szybka pomoc jest kluczowa w sytuacjach kryzysowych, dlatego każda darowizna ma ogromne znaczenie. Wspólnie możemy pomóc tym, którzy potrzebują natychmiastowego wsparcia.",
            image: "src/assets/food.jpg",
            filteredCategory: urgent
        }
    ];

    const navigate = useNavigate();

    //category w JSON jest obiektem, a nie stringiem. Jednak w kontekście funkcji handleFilterClick, zakładamy, że category jest przekazywane jako string reprezentujący jedną z właściwości tego obiektu, a nie cały obiekt.
    const handleFilterClick = (filteredCategory) => {
        navigate(`/announcements?category=${filteredCategory}`);
    };
    //   - Użycie category jako parametru zapytania w URL pozwala na przekazanie informacji o tym, jak chcesz filtrować dane na stronie. Na przykład, jeśli chcesz wyświetlić tylko ogłoszenia związane z ubraniami, możesz użyć /announcements-list_and_details?category=clothesAndShoes.

    const category = [clothesAndShoes, accessories, urgent];

    //nie wiem czy to będzie
    function handleFilterVoi() {
        setVoivodeship(voivodeship)
    }

    return (
        <section className="section__home">
            {/* Container z treścią */}
            <div className="h-100 align-items-center text-white pt-5 mt-2">
                {/* 🔷 SearchBar ponad napisem */}
                <div className="w-100">
                    <SearchBar onVoivodeship={handleFilterVoi}/>
                </div>
            </div>
            <div className="container mb-5">
                <div className="row g-3 justify-content-center">
                    {cards.map(({ title, description, image }, index) => (
                        <div key={index} className="col-12 col-sm-6 col-lg-4">
                            <Button
                                variant="primary"
                                // key={key}
                                // id={`filter-${key}`} //przypisanie id do przycisku
                                onClick={() => handleFilterClick(filterCategory)}
                            >Dołącz się!</Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Filters;