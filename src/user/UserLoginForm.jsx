import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { API } from '@/constants.js';

/**
 * Komponent formularza logowania użytkownika.
 * - Umożliwia logowanie na podstawie emaila i hasła.
 * - W razie sukcesu zapisuje dane użytkownika w kontekście i przekierowuje do strony głównej.
 * - W razie błędu wyświetla komunikat pod formularzem.
 * - Jeśli użytkownik jest już zalogowany → formularz nie jest renderowany.
 */
function UserLoginForm() {
  const { login, user } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * Obsługuje wysłanie formularza logowania:
   * - waliduje dane wejściowe,
   * - pobiera użytkownika z API po adresie email,
   * - porównuje hasło z odpowiedzią serwera,
   * - w razie sukcesu loguje użytkownika i przekierowuje na stronę główną,
   * - w przeciwnym razie ustawia komunikat o błędzie.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email i hasło są wymagane');
      return;
    }

    try {
      // encodeURIComponent zabezpiecza email w URL, aby uniknąć błędów przy znakach specjalnych
      // Zabezpiecza email użytkownika (lub każdy inny tekst) w URL, aby nie zepsuł on zapytania GET. Bez tego funkcja mogłaby zwracać błędy lub szukać złego użytkownika.
      const response = await fetch(
        `${API}/users?email=${encodeURIComponent(email)}`,
      );

      // To jest żądanie typu GET – pobiera dane użytkownika, który ma podany e-mail
      if (!response.ok) {
        throw new Error('Błąd sieciowy lub serwera');
      }

      const data = await response.json();
      const u = data[0]; // data[0] odnosi się do pierwszego użytkownika w tablicy data, ponieważ zakładamy unikalny email

      if (!u || u.password !== password) {
        // Sprawdza, czy użytkownik istnieje i czy hasło się zgadza; jeśli tak → logowanie, jeśli nie → komunikat o błędzie
        setError('Nieprawidłowe dane');
      } else {
        login({ id: u.id, name: u.name, surname: u.surname, email: u.email }); // Logowanie zapisane do localStorage
        navigate('/'); // Zmiana na stronę główną po zalogowaniu
      }
    } catch (error) {
      setError('Nie ma takiego użytkownika');
    }
  };

  // Warunek, jeśli użytkownik jest już zalogowany, nie renderuje się formularza logowania- zapobiega to migotaniu UI działa jako sprawdzenie przed renderowaniem, aby uniknąć tymczasowego wyświetlania formularza logowania.
  if (user) return null;

  return (
    <section className="user__login">
      <div className="img-container">
        {/*Atrybut loading="lazy" w <img> mówi przeglądarce, żeby odłożyła ładowanie obrazka do momentu, aż będzie potrzebny, czyli gdy użytkownik przewinie stronę w jego okolice.*/}
        <img src="/login.webp" alt="login" loading="lazy" />
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
          {/*Dzięki ustawieniu w labelu htmlFor i id w input, kliknięcie na tekst "Email"/"Password" spowoduje, że fokus zostanie przeniesiony do pola tekstowego o id="email"/"password".*/}
          <input
            id="email"
            className="form-control"
            type="email"
            name="email"
            placeholder="Twój email"
            autoComplete="username" // Autouzupełnienie danych z przeglądarki
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
        {/*"/register" – tu potrzebny jest ukośnik, bo navigate() lub to="" w <NavLink> zawsze wymaga ścieżki absolutnej.*/}
        <NavLink to="/register" className="fw-normal d-inline-flex pb-4">
          Zarejestruj się
        </NavLink>
      </div>
    </section>
  );
}

export default UserLoginForm;
