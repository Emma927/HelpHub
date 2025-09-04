import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

/**
 * Komponent Hero wyświetla główną sekcję powitalną strony.
 * - Zawiera nagłówki, grafiki lub treści wprowadzające.
 * - Zawiera <Outlet />, który umożliwia renderowanie komponentów stron zagnieżdżonych (nested routes) w tym miejscu.
 */
function Layout() {
  return (
    <>
      <Header />
      <Hero />
      <Footer />
    </>
  );
}

export default Layout;
