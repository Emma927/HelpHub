import { useState } from 'react';
import { useUser } from '@/contexts/userContext/useUser';
import { NavLink, useNavigate } from 'react-router-dom';
import { API } from '@/constants.js';

/**
 * User registration form component.
 * Handles validation, account creation, and automatic login.
 * Returns null if the user is already authenticated.
 */
function UserRegisterForm() {
  const { login, user } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errors, setErrors] = useState([]);

  /**
   * Validates form data and returns an array of error messages.
   */
  const validate = () => {
    const errs = [];

    if (name.length < 3) errs.push('Imię min. 3 znaki');
    if (surname.length < 3) errs.push('Nazwisko min. 3 znaki');
    if (!email.includes('@')) errs.push('Email musi zawierać @');
    if (password.length < 7) errs.push('Hasło min. 7 znaków');
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) errs.push('Hasło musi zawierać wielką literę');
    // Check for at least one digit or special character (!@#$)
    if (!/[0-9!@#$]/.test(password))
      errs.push('Hasło musi zawierać cyfrę lub symbol');
    if (password !== passwordRepeat) errs.push('Hasła muszą być zgodne');

    return errs;
  };

  /**
   * Processes the registration request.
   */
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(`${API}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (!response.ok) throw new Error('Rejestracja nie powiodła się');

      const saved = await response.json();

      // Login user and redirect after successful registration
      login({ id: saved.id, name, surname, email });
      navigate('/');
    } catch (err) {
      setErrors([err.message]);
    }
  };

  // Prevent form rendering if user is already logged in
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
        <NavLink to="/login" className="fw-normal d-inline-flex pb-4">
          Zaloguj się
        </NavLink>
      </div>
      <div className="img-container img-container--register">
        <img
          src="https://res.cloudinary.com/dtoczcwf4/image/upload/helphub_images/register.avif"
          alt="login"
          loading="lazy"
        />
        <div className="text text-register">
          <h3>Czekamy na Ciebie!</h3>
          <h4>Zarejestruj się, aby korzystać z pełni możliwości HelpHub!</h4>
        </div>
      </div>
    </section>
  );
}

export default UserRegisterForm;
