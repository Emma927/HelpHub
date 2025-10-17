import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';

/**
 * Layout – główny komponent układu aplikacji.
 * - Zawiera nagłówek (Header) i stopkę (Footer), które są stałe na wszystkich stronach.
 * - Renderuje zawartość podstron przez <Outlet /> w głównej części strony (<main>).
 * - Zapewnia marginesy i wyrównanie za pomocą klas CSS (flexbox, container, padding).
 */
function Layout() {
  return (
    <>
      <Header />
      <main className="d-flex flex-grow-1 justify-content-center pt-2">
        <div className="container d-flex justify-content-center mt-5 pt-5">
          <Outlet /> {/* Renderuje podstrony zależnie od aktualnej ścieżki */}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
