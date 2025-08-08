import React, { useState, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';
import imageRegister from '../../public/register.jpg';
import { API } from '@/constans.js';

function UserRegisterForm() {
  const { login, user } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errors, setErrors] = useState([]);

  const validate = () => {
    const errs = [];

    if (name.length < 3) {
      errs.push('Imię min. 3 znaki');
    }

    if (surname.length < 3) {
      errs.push('Nazwisko min. 3 znaki');
    }

    if (!email.includes('@')) {
      errs.push('Email musi zawierać @');
    }
    if (password.length < 7) {
      errs.push('Hasło min. 7 znaków');
    }
    // Wyrażenie regularne -regex /[A-Z]/, sprawdza, czy w ciągu znaków znajduje się przynajmniej jedna wielka litera (od A do Z)
    // test() zwraca true, jeśli w haśle nie ma żadnej wielkiej litery, a false, jeśli przynajmniej jedna wielka litera jest obecna
    if (!/[A-Z]/.test(password)) {
      errs.push('Hasło musi zawierać wielką literę');
    }
    // Wyrażenie regularne -regex /[0-9!@#$]/, sprawdza, czy w ciągu znaków znajduje się przynajmniej jedna cyfra (od 0 do 9) lub jeden z wymienionych symboli (!, @, #, $).
    // test() zwraca true, jeśli nie ma żadnej cyfry ani symbolu w haśle, a false, jeśli przynajmniej jeden z tych znaków jest obecny.*/
    if (!/[0-9!@#$]/.test(password)) {
      errs.push('Hasło musi zawierać cyfrę lub symbol');
    }
    if (password !== passwordRepeat) {
      errs.push('Hasła muszą być zgodne');
    }
    return errs;
  };

  // Obsługa zdarzenia przesyłania formularza, która ma miejsce, gdy użytkownik kliknie przycisk "Zarejestruj się".
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(); // Zmienna, która przechowuje błędy walidacji
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }

    // Dane są wysłane tylko wtedy, gdy użytkownik wypełni formularz i kliknie przycisk
    fetch(`${API}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, surname, email, password }), // Konwertuje obiekt na JSON do przesłania w żądaniu HTTP.
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Rejestracja nie powiodła się');
      })
      .then((saved) => {
        // Po zapisaniu użytkownika automatycznie zaloguj go, używając danych z serwera, w tym przypisanym przez serwer id.
        login({ id: saved.id, name, surname, email }); // Przekaż dane użytkownika do funkcji login, aby zaktualizować stan i zapisać je w localStorage.
        navigate('/'); // Użytkownik się właśnie zarejestrował – przekierowanie po fetchu na stronę główną
      })
      .catch((err) => setErrors([err.message])); // Tablica, bo errors.map w renderze oczekuje tablicy
  };

  // Warunek, jeśli użytkownik jest już zalogowany, nie renderuj formularza rejestracji- zapobiega to migotaniu UI działa jako sprawdzenie przed renderowaniem, aby uniknąć tymczasowego wyświetlania formularza rejestracji.
  if (user) return null;

  return (
    <section className="user__login user__register">
      <div className="user__login-form user__register-form">
        <h3>Nie masz jeszcze konta?</h3>
        <form onSubmit={handleRegisterSubmit}>
          <label htmlFor="name" className="form-label">
            Imię
          </label>
          <input
            id="name"
            className="form-control"
            type="text"
            name="yourName"
            placeholder="Twoje imię"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="surname" className="form-label">
            Nazwisko
          </label>
          <input
            id="surname"
            className="form-control"
            type="text"
            name="yourSurname"
            placeholder="Twoje nazwisko"
            autoComplete="family-name"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          {/*Dzięki ustawieniu w lablelu htmlFor i id w input - kliknięcie na tekst "Email"/"Password" spowoduje, że fokus zostanie przeniesiony do pola tekstowego o id="email"/"password". Dzięki temu użytkownicy mogą łatwiej wypełniać formularze, a czytniki ekranu mogą poprawnie odczytywać etykiety w kontekście odpowiednich pól.*/}
          <input
            id="email"
            className="form-control"
            type="email"
            name="yourEmail"
            placeholder="Twój email"
            autoComplete="username"
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
            name="yourPassword"
            autoComplete="new-password"
            placeholder="Twoje hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/*Użyj autoComplete="new-password" w formularzu, aby kontrolować autouzupełnianie przeglądarki*/}
          <label htmlFor="passwordRepeat" className="form-label">
            Powtórz hasło
          </label>
          <input
            id="passwordRepeat"
            className="form-control"
            type="password"
            name="yourPasswordRepeat"
            autoComplete="new-password"
            placeholder="Powtórz Twoje hasło"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
          {errors.map((error, index) => (
            <p className="text-danger" key={index}>
              {error}
            </p>
          ))}
          <button type="submit" className="btn--welcome fw-normal">
            Zarejestruj się
          </button>
        </form>
        <h3 className="mt-4">Masz konto?</h3>
        {/*redirectTo="/auth/user/login" – tu potrzebny jest ukośnik, bo navigate() lub to="" w <NavLink> zawsze wymaga ścieżki absolutnej.*/}
        <NavLink to="/auth/user/login" className="fw-normal d-inline-flex pb-4">
          Zaloguj się
        </NavLink>
      </div>
      <div className="img-container img-container--register">
        <img src={imageRegister} alt="login" loading="lazy" />
        <div className="text text-register">
          <h3>Czekamy na Ciebie!</h3>
          <h4>Zarejestruj się, aby korzystać z pełni możliwości HelpHub!</h4>
        </div>
      </div>
    </section>
  );
}

export default UserRegisterForm;
