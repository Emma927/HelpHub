import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

/**
 * Komponent odpowiedzialny za ochronę tras wymagających zalogowanego użytkownika.
 * - Jeśli użytkownik jest zalogowany → renderuje chronione komponenty (Outlet).
 * - Jeśli nie → przekierowuje do strony logowania (lub ścieżki podanej w `redirectTo`).
 * - Jeśli status użytkownika wciąż się ładuje → nie renderuje niczego, aby uniknąć
 *   przedwczesnego przekierowania.
 */
function ProtectedRoute({ redirectTo = '/login' }) {
  const { user, isLoadingUser } = useUser();

  // Jeśli stan użytkownika jest w trakcie ładowania, nie renderujemy niczego i nie wykonujemy przekierowania.
  // Dzięki temu unikamy sytuacji, w której aplikacja od razu przekierowuje niezalogowanego użytkownika, zanim stan zostanie ustalony.
  if (isLoadingUser) {
    return null;
  }

  // Jeśli użytkownik jest zalogowany → renderujemy chronione komponenty w Outlet
  // Jeśli nie → przekierowanie do strony logowania na `redirectTo`
  return user ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
