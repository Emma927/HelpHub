import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';

//Props redirectTo w ProtectedRoute jest używany do określenia, do jakiej ścieżki użytkownik zostanie przekierowany, jeśli nie jest zalogowany. Jest to wartość domyślna, którą można nadpisać, jeśli ProtectedRoute jest używany w innym kontekście i potrzebujesz innej ścieżki przekierowania.
// Ustawienie domyślnej wartości dla redirectTo zapewnia, że nawet jeśli ten prop nie zostanie przekazany podczas użycia komponentu ProtectedRoute, aplikacja nadal będzie działać poprawnie i przekieruje użytkownika do domyślnej ścieżki logowania.

// Komponent chroniący dostęp do ścieżki favourites
function ProtectedRoute({ redirectTo = '/auth/user/login' }) {
  //Użycie destrukturyzacji z wartością domyślną, aby, aby komponent zawsze miał sensowną domyślną wartość i nie przekazywać wartości za każdym razem.
  const { user, isLoadingUser } = useContext(UserContext);

  //isLoadingUser zapewnia, że decyzje dotyczące renderowania i przekierowań są podejmowane dopiero po pełnym załadowaniu stanu użytkownika. Dzięki temu unika się niepotrzebnych przekierowań na stronę logowania i zapewnia płynniejsze działanie aplikacji, szczególnie podczas odświeżania strony na chronionych ścieżkach.
  if (isLoadingUser) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to={redirectTo} />;
}

// Pierwszy Outlet — w komponencie Layout — odpowiada za Home, ProtectedRoute, Announcements, itd.
// Drugi Outlet — w ProtectedRoute — odpowiada za FavouriteAnnouncements (czyli wszystko, co ma być chronione).

export default ProtectedRoute;
