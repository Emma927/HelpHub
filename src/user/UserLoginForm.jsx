import { useState } from 'react';
import { useUser } from '@/contexts/userContext/useUser';
import { useNavigate, NavLink } from 'react-router-dom';
import { API } from '@/constants.js';

/**
 * User login form component.
 * Handles authentication, user context update, and redirection.
 * Returns null if user is already authenticated.
 */
function UserLoginForm() {
  const { login, user } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * Handles the login submission.
   * Fetches user data by email and validates credentials.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email i hasło są wymagane');
      return;
    }

    try {
      // encodeURIComponent ensures the email is safe for use in a URL
      const response = await fetch(
        `${API}/users?email=${encodeURIComponent(email)}`,
      );

      if (!response.ok) {
        throw new Error('Błąd sieciowy lub serwera');
      }

      const data = await response.json();
      const u = data[0]; // Assume unique email, take the first result

      if (!u || u.password !== password) {
        setError('Nieprawidłowe dane');
      } else {
        // Login user and redirect after successful authentication
        const { id, name, surname, email } = u;
        login({ id, name, surname, email });
        navigate('/');
      }
    } catch (error) {
      console.error('Szczegóły błędu logowania:', error);
      setError('Nie ma takiego użytkownika');
    }
  };

  // Prevent form rendering if user is already logged in
  if (user) return null;

  return (
    <section className="user__login">
      <div className="img-container">
        <img
          src="https://res.cloudinary.com/dtoczcwf4/image/upload/helphub_images/login.avif"
          alt="login"
          loading="lazy"
        />
        <div className="text">
          <h3>Hej!</h3>
          <h4>Dobrze Cię widzieć!</h4>
          <p>Zaloguj się, aby zarządzać swoimi ulubionymi ogłoszeniami.</p>
        </div>
      </div>
      <div className="user__login-form">
        <h3>Masz już konto?</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            className="form-control"
            type="email"
            name="email"
            placeholder="Twój email"
            autoComplete="username" // Enables browser credential autofill
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="form-label">
            Hasło
          </label>
          <input
            id="password"
            className="form-control"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Twoje hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-danger">{error}</div>}
          <button type="submit" className="btn--welcome fw-normal">
            Zaloguj się
          </button>
        </form>
        <h3 className="mt-4">Nie masz konta?</h3>
        <NavLink to="/register" className="fw-normal d-inline-flex pb-4">
          Zarejestruj się
        </NavLink>
      </div>
    </section>
  );
}

export default UserLoginForm;
