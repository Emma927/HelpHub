import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@/contexts/userContext/useUser';

/**
 * Protects private routes. Renders an Outlet if authenticated,
 * otherwise redirects to the login page.
 */
function ProtectedRoute({ redirectTo = '/login' }) {
  const { user } = useUser();

  // No loading state needed: user is read synchronously from localStorage
  return user ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
