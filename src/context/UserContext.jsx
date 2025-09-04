import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

/**
 * Provider `UserProvider` zarządza globalnym stanem użytkownika.
 * - Przy pierwszym załadowaniu aplikacji odtwarza sesję z localStorage.
 * - Udostępnia:
 *    - `user` – aktualnie zalogowany użytkownik (lub `null`),
 *    - `isLoadingUser` – wskaźnik ładowania danych użytkownika,
 *    - `login(userData)` – logowanie i zapis do localStorage,
 *    - `logout()` – wylogowanie i czyszczenie localStorage.
 * Dzięki temu kontekstowi wszystkie komponenty (np. `UserLoginForm`,
 * `UserRegisterForm`, `ProtectedRoute`) mają dostęp do stanu użytkownika.
 */
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoadingUser(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoadingUser }}>
      {children}
    </UserContext.Provider>
  );
}
