import { useState } from 'react';
import { UserContext } from './UserContext';

/**
 * UserProvider - Manages global user authentication state.
 * - Restores session from localStorage on initial load.
 * - Provides user data, login, and logout functions via Context API.
 */
export function UserProvider({ children }) {
  // Lazy initialization: read user from localStorage once during the initial mount.
  // try/catch avoids crash if localStorage data is invalid
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null; // fallback if JSON is invalid, ProtectedRoute handles redirection to /logi
    }
  });
  // Updates state and persists user data to localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  // Clears state and removes user data from localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
