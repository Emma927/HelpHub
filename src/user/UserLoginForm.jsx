import React, { useState, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { useNavigate, NavLink } from 'react-router-dom';
import imageLogin from '@/assets/login.jpg';
import { API } from '@/constans.js';

function UserLoginForm() {
  const { login, user } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email i hasło są wymagane');
      return;
    }

    // encodeURIComponent-koduje znaki specjalne, takie jak spacje, znaki interpunkcyjne, itp., które mogłyby zakłócić prawidłowe przetwarzanie adresu URL. Jest używany do przekształcenia takich znaków w bezpieczne sekwencje znaków, które są poprawnie interpretowane przez przeglądarki i serwery. Dzięki temu URL jest zawsze poprawny i nie powoduje błędów podczas przesyłania żądania.
    fetch(`${API}/users?email=${encodeURIComponent(email)}`)
      // To jest żądanie typu GET – pobiera dane użytkownika, który ma podany e-mail
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Błąd sieciowy lub serwera');
      })
      .then((data) => {
        const u = data[0]; // data[0] odnosi się do pierwszego użytkownika w tablicy data, która została zwrócona przez serwer w odpowiedzi na zapytanie o użytkowników z danym adresem email. Adresy e-mail typowo są unikalne, więc powinien zostać zwrócony 1 użytkownik, dlatego należy się spodziewać data[0].
        if (!u || u.password !== password) {
          // Weryfikacja użytkownika-kod sprawdza, czy istnieje użytkownik (u) i czy jego hasło zgadza się z podanym hasłem. Jeśli tak, użytkownik jest logowany, w przeciwnym razie wyświetlany jest komunikat o błędzie.
          setError('Nieprawidłowe dane');
        } else {
          login({ id: u.id, name: u.name, surname: u.surname, email: u.email }); // Logowanie zapisane do localStorage
          navigate('/'); // Zmiana na stronę główną po zalogowaniu
        }
      })
      .catch((error) => setError(error.message));
  };

  // Warunek, który chroni przed przypadkowym mrugnięciem formularza logowania, gdy użytkownik jest już zalogowany, ale jego stan jeszcze nie został przetworzony przez komponent. Zapobiega to migotaniu UI działa jako sprawdzenie przed renderowaniem, aby uniknąć tymczasowego wyświetlania formularza logowania.
  if (user) return null;

  return (
    <section className="user__login">
      <div className="img-container">
        <img src={imageLogin} alt="login" />
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
          {/*Dzięki ustawieniu w lablelu htmlFor i id w input - kliknięcie na tekst "Email"/"Password" spowoduje, że fokus zostanie przeniesiony do pola tekstowego o id="email"/"password". Dzięki temu użytkownicy mogą łatwiej wypełniać formularze, a czytniki ekranu mogą poprawnie odczytywać etykiety w kontekście odpowiednich pól.*/}
          <input
            id="email"
            className="form-control"
            type="email"
            name="email"
            placeholder="Twój email"
            autoComplete="username" // autouzupełnienie danych z przeglądarki
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
        {/*redirectTo="/auth/user/register" – tu potrzebny jest ukośnik, bo navigate() lub to="" w <NavLink> zawsze wymaga ścieżki absolutnej.*/}
        <NavLink
          to="/auth/user/register"
          className="fw-normal d-inline-flex pb-4"
        >
          Zarejestruj się
        </NavLink>
      </div>
    </section>
  );
}

export default UserLoginForm;
