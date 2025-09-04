import { Outlet } from 'react-router-dom';

/**
 * Komponent `Hero`
 * - Stanowi główną część strony, w której renderowane są podstrony aplikacji.
 * - Używa `Outlet` z React Router do wyświetlania treści zależnej od aktualnej ścieżki.
 * - Zapewnia odpowiednie marginesy i wyrównanie za pomocą klasy `container` oraz flexbox.
 * - Jest komponentem „layoutowym”, który otacza inne strony.
 */
function Hero() {
  return (
    <main className="d-flex flex-grow-1 justify-content-center pt-2">
      <div className="container d-flex justify-content-center mt-5 pt-5">
        <Outlet /> {/* Renderuje podstrony zależnie od aktualnej ścieżki */}
      </div>
    </main>
  );
}

export default Hero;
