import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';

//Props redirectTo w ProtectedRoute jest używany do określenia, do jakiej ścieżki użytkownik zostanie przekierowany, jeśli nie jest zalogowany. Jest to wartość domyślna, którą można nadpisać, jeśli ProtectedRoute jest używany w innym kontekście i potrzebujesz innej ścieżki przekierowania.

// Komponent chroniący dostęp do ścieżki favourites - ProtectedRoute działa na poziomie routingu aplikacji. Zapewnia, że nawet jeśli użytkownik bezpośrednio wpisze adres URL chronionej strony w przeglądarce, aplikacja sprawdzi stan zalogowania i przekieruje go na stronę logowania, jeśli nie jest zalogowany.
function ProtectedRoute({ redirectTo = '/auth/user/login' }) {
  const { user, isLoadingUser } = useContext(UserContext);

  // Sprawdzanie stanu ładowania użytkownika- isLoadingUser pochodzi z UserContext i informuje, czy dane użytkownika są w trakcie ładowania. Jeśli isLoadingUser jest true, komponent zwraca null, co oznacza, że nie renderuje niczego do momentu zakończenia ładowania. To zapobiega niepotrzebnym przekierowaniom, gdy stan użytkownika nie jest jeszcze znany.
  if (isLoadingUser) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to={redirectTo} />; // Warunek zadziała dobrze pod warunkiem, że redirectTo ma wartość i właśnie po to jest wartość domyślna, jeśli nikt nie poda jej ręcznie. Zabezpiecza logikę przed błędnym wywołaniem kompoentnu bez redirectTo.
}
// Pierwszy Outlet — w komponencie Layout — odpowiada za Home, ProtectedRoute, Announcements, itd.
// Drugi Outlet — w ProtectedRoute — odpowiada za FavouriteOffers (czyli wszystko, co ma być chronione).
export default ProtectedRoute;
