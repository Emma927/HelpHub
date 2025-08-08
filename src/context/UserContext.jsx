import { createContext, useState, useEffect } from 'react';

// Ten kod tworzy mechanizm zarządzania stanem użytkownika w aplikacji, umożliwiając logowanie, wylogowywanie i przechowywanie danych sesji w localStorage.
export const UserContext = createContext(); // Tworzymy nowy kontekst o nazwie UserContext. Kontekst pozwala na dzielenie stanu między komponentami bez potrzeby przekazywania propsów przez wiele poziomów.

// Komponent dostarczający kontekst do całej aplikacji. UserProvider będzie dostarczał wartość kontekstu do wszystkich komponentów podrzędnych (children).
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Dane zalogowanego użytkownika. Inicjalizujemy stan user jako null, co oznacza brak zalogowanego użytkownika na początku. setUser to funkcja, która pozwala na aktualizację tego stanu.
  const [isLoadingUser, setIsLoadingUser] = useState(true); // isLoadingUser jest używany jako wskaźnik, informujący aplikację, że trwa proces sprawdzania, czy dane użytkownika są już dostępne. Inicjalizujemy stan isLoadingUser jako true, co oznacza, że aplikacja jest w trakcie ładowania danych użytkownika, a po zakończeniu ładowania ustawiamy na false.

  // useEffect służy tutaj do wczytania użytkownika z localStorage przy pierwszym załadowaniu strony. Pusta tablica oznacza, że efekt uruchomi się tylko raz.
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Pobieramy dane użytkownika z localStorage, jeśli istnieje. Jeśli ktoś się zalogował, jego dane (jako string JSON) będą dostępne pod kluczem "user". localStorage to mechanizm przechowywania danych w przeglądarce w formacie tekstowym.
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Jeśli dane użytkownika istnieją, parsujemy je z formatu JSON na obiekt JavaScript. Następnie aktualizujemy stan user, czyli przywracamy sesję użytkownika. Bez parsowania do obiektu nie udałoby się zaktualizować danych.
    }
    setIsLoadingUser(false); // Ustawia isLoadingUser na false, co oznacza, że zakończyło się ładowanie danych użytkownika. Od tej pory aplikacja wie, czy użytkownik jest zalogowany, czy nie.
  }, []); // Pusta tablica- useEffect uruchamia się tylko raz po zamontowaniu komponentu

  // Funkcja do logowania użytkownika- otrzymuje dane userData z fetch metoda POST(register) i GET(login) z UserRegisterForm albo UserLoginForm
  const login = (userData) => {
    // userData, to obiekt, który przychodzi z formularza
    setUser(userData); // Aktualizujemy stan user, dzięki czemu wszystkie komponenty "widzą", że ktoś się zalogował
    localStorage.setItem('user', JSON.stringify(userData)); // Zapisujemy dane użytkownika w localStorage w formacie JSON, żeby po odświeżeniu strony można było je przywrócić
  };

  // Funckja wylogowania użytkwonika - czyli usunięcie użytkownika z localStorage
  const logout = () => {
    setUser(null); // Usuwamy zapisane dane z localStorage-czyli po odświeżeniu użytkownik już nie będzie zalogowany. To wpływa na interfejs użytkownika, poprzez ukrycie buttona Zaloguj/Wyloguj i pokazanie spowrotem Zaloguj-dla organizacji. Brak możliwości wejścia do ulubionych.
    localStorage.removeItem('user'); // Usunięcie danych z lokalnej pamięci przeglądarki
  };

  // Zwracamy UserContext.Provider, który udostępnia wartości user, login, logout, i isLoadingUser wszystkim komponentom podrzędnym, umożliwiając im dostęp do stanu użytkownika i funkcji logowania/wylogowania.
  return (
    <UserContext.Provider value={{ user, login, logout, isLoadingUser }}>
      {children}
    </UserContext.Provider>
  );
}
