import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';

/**
 * Main application layout.
 * - Persistent Header and Footer across all routes.
 * - <Outlet /> renders the nested route components.
 */
function Layout() {
  return (
    <>
      <Header />
      <main className="d-flex flex-grow-1 justify-content-center">
        <div className="container mt-5 pt-5">
          {/* Container for route-specific content with top spacing */}
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
