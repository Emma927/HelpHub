import { createContext, useState, useEffect } from 'react';

// Ten kod tworzy mechanizm zarządzania stanem użytkownika w aplikacji, umożliwiając logowanie, wylogowywanie i przechowywanie danych sesji w localStorage.
export const UserContext = createContext(); // Tworzymy nowy kontekst o nazwie UserContext. Kontekst pozwala na dzielenie stanu między komponentami bez potrzeby przekazywania propsów przez wiele poziomów.

// Komponent dostarczający kontekst do całej aplikacji. UserProvider będzie dostarczał wartość kontekstu do wszystkich komponentów podrzędnych (children).
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Dane zalogowanego użytkownika. Inicjalizujemy stan user jako null, co oznacza brak zalogowanego użytkownika na początku. setUser to funkcja, która pozwala na aktualizację tego stanu.
  const [isLoadingUser, setIsLoadingUser] = useState(true); // Tworzymy stan, który informuje, czy trwa wczytywanie danych użytkownika z localStorage. Inicjalizujemy stan isLoadingUser jako true, co oznacza, że aplikacja jest w trakcie ładowania danych użytkownika. Po zakończeniu ładowania ustawiamy na false.

  // useEffect służy tutaj do wczytania użytkownika z localStorage przy pierwszym załadowaniu strony. Pusta tablica oznacza, że efekt uruchomi się tylko raz. Kolejność pobierania danych przed ich zapisem wynika z potrzeby przywrócenia stanu użytkownika przy pierwszym załadowaniu komponentu oraz z zasad działania hooków w React.
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Pobieramy dane użytkownika z localStorage, jeśli istnieje. Jeśli ktoś się zalogował, jego dane (jako string JSON) będą dostępne pod kluczem "user". localStorage to mechanizm przechowywania danych w przeglądarce w formacie tekstowym.
    if (storedUser) {
      // Jeśli dane użytkownika istnieją
      // Sprawdzamy, czy w localStorage są zapisane dane użytkownika. Jeśli tak, przechodzimy do aktualizacji stanu.
      // Bez parsowania aktualizacja stanu user nie byłaby możliwa w poprawnej formie.
      setUser(JSON.parse(storedUser)); // Jeśli dane użytkownika istnieją, parsujemy je z formatu JSON na obiekt JavaScript. Następnie aktualizujemy stan user, czyli przywracamy sesję użytkownika. Bez parsowania do obiektu nie udałoby się zaktualizować danych
      // Parsowanie jest konieczne, ponieważ localStorage przechowuje dane w formacie tekstowym, więc gdy zapisujesz obiekt użytkownika, musisz go najpierw zamienić na format JSON (czyli tekst). Podczas odczytywania tych danych z localStorage, otrzymujesz ciąg tekstowy, który musi zostać przekształcony z powrotem na obiekt JavaScript za pomocą JSON.parse(), aby móc go użyć w aplikacji i zaktualizować stan.
      // Skąd bierze się user w UserProvider?
      // Kiedy użytkownik się wylogowuje, dane użytkownika są usuwane z localStorage i stan user jest ustawiany na null. Jeśli użytkownik zaloguje się ponownie, nowe dane użytkownika są przesyłane do aplikacji, zazwyczaj za pomocą formularza logowania. Po pomyślnym logowaniu te nowe dane są ponownie zapisywane w localStorage za pomocą funkcji login. Oznacza to, że za każdym razem, gdy użytkownik się loguje, aktualne dane są przechowywane w localStorage, nawet jeśli wcześniej zostały usunięte podczas wylogowania.
    }
    setIsLoadingUser(false); // Ustawia isLoadingUser na false, co oznacza, że zakończyło się ładowanie danych użytkownika. Od tej pory aplikacja wie, czy użytkownik jest zalogowany, czy nie.
  }, []); // Pusta tablica- useEffect uruchamia się tylko raz po zamontowaniu komponentu

  // Funkcja do logowania użytkownika- otrzymuje dane userData z fetch metoda POST(register) i GET(login) z UserRegisterForm albo UserLoginForm
  const login = (userData) => {
    // userData, to obiekt, który przychodzi z formularza
    // Skąd się bierze ten parametr userData - z fetch
    setUser(userData); // Aktualizujemy stan user, dzięki czemu wszystkie komponenty "widzą", że ktoś się zalogował
    localStorage.setItem('user', JSON.stringify(userData)); // Zapisujemy dane użytkownika w localStorage w formacie JSON, żeby po odświeżeniu strony można było je przywrócić. Local Storage może jedynie przechowywać dane typu string. Jeżeli chcemy przechować tablice albo obiekty, musimy najpierw wykonać na nich konwersję. W tym celu możemy posłużyć się metodą JSON.stringify()
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

// isLoadingUser jest używany do oznaczenia, że aplikacja jest w trakcie sprawdzania, czy użytkownik jest zapisany w localStorage. Pozwala to na uniknięcie sytuacji, w której komponenty zależne od stanu użytkownika próbują się renderować, zanim ten stan zostanie ustalony.
// isLoadingUser jest używany jako wskaźnik, informujący aplikację, że trwa proces sprawdzania, czy dane użytkownika są już dostępne.
// isLoadingUser zapewnia, że aplikacja nie renderuje komponentów, które wymagają informacji o użytkowniku, zanim te informacje nie będą dostępne. To pomaga w uniknięciu migotania UI i niepotrzebnych przekierowań