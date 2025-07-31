import { Carousel } from 'react-bootstrap';

const images = [
  {
    image: 'src/assets/zbiorka1.png',
    index: '001',
    hText: 'Zbórka dla powodzian, Wrocław',
  },
  {
    image: 'src/assets/zbiorka2.jpg',
    index: '002',
    hText: 'Zbórka dla dzieci z domu dziecka, Kraków',
  },
  {
    image: 'src/assets/zbiorka3.jpg',
    index: '003',
    hText: 'Zbórka dla bezdomnych, Gdańsk',
  },
];

function Initiatives() {
  return (
    <div className="initiatives d-flex flex-column justify-content-center">
      <div className="carousel--before">
        <p className="font--resp">
          Aktywnie uczestniczymy w zbiórkach, w ramach współpracy z naszymi
          organizatorami.
        </p>
        <h3 className="text-primary">GALERIA ZDJĘĆ:</h3>
      </div>
      <Carousel className="w-100 text-center">
        {images.map(({ image, index, hText }) => (
          <Carousel.Item key={index}>
            <img src={image} alt="team" />
            <Carousel.Caption>
              <h3 className="pb-3">{hText}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Initiatives;
