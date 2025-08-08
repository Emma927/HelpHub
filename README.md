# HelpHub

Centralna aplikacja ogłoszeniowa łącząca użytkowników z organizacjami pomocowymi przeprowadzającymi zbiórki ubrań,
obuwia, akcesoriów i żywności w Polsce. Rozwiązuje problem braku jednego miejsca do przeglądania i dodawania zbiórek
przez różne organizacje pomocowe.

**Dostępna online pod adresem:**  
[https://help-hub-render.netlify.app/](https://help-hub-render.netlify.app/)

## 🚀 Funkcjonalności

- Przeglądanie ogłoszeń
- Filtrowanie ogłoszeń według wybranych kategorii
- Responsywny interfejs
- Paginacja stron z ogłoszeniami
- Rejestracja i logowanie użytkownika
- Dodawanie / usuwanie ogłoszeń z ulubionych
- Routing React Router

## 🛠️ Technologie

- Vite
- React
- Sass (w kodzie został zastosowany @import ze względu na zgodność z biblioteką Bootstrap)
- React Router
- JSON server
- Bootstrap
- React-Bootstrap
- React-Icons
- Responsive Web Design
- Context Api
- localStorage
- dotlottie-react
- React-Select

## 🔧 Instalacja lokalna

1. **Utwórz na swoim urządzeniu lokalny folder o nazwie `help-hub`**

   To będzie miejsce, gdzie skopiujesz repozytorium.

2. **Skopiuj aplikację do utworzonego folderu**

   Użyj polecenia `git clone`, aby pobrać repozytorium:

   `git clone https://github.com/Twoje-konto/HelpHub.git`

3. **Przejdź do głównego folderu w terminalu**

   Przejdź do katalogu projektu, aby móc uruchamiać polecenia npm:

   `cd help-hub`

4. **Zainstaluj aplikację**

   Zainstaluj wszystkie potrzebne zależności:

   `npm install`

5. **Skonfiguruj zmienne środowiskowe**

   `.env` — plik dołączony do repozytorium z domyślnym adresem backendu (np. produkcyjnym):

   `VITE_API_URL=https://help-hub-2sac.onrender.com`

   `.env.local` — plik lokalny (ignorowany przez Git), w którym możesz nadpisać adres backendu, np. do lokalnego
   testowania:

   `VITE_API_URL=http://localhost:10000`

   Jeśli `.env.local` nie istnieje, aplikacja użyje ustawień z `.env`

6. **Uruchom aplikację w trybie developerskim**

   Aby uruchomić aplikację w trybie developerskim, użyj:

   `npm run dev`

7. **Buduj aplikację do produkcji (opcjonalnie)**

   Przygotuj aplikację do wdrożenia w środowisku produkcyjnym:

   `npm run build`

## 🖥️ Backend i hosting

Backend aplikacji w środowisku produkcyjnym jest hostowany na platformie Render pod adresem:
`https://help-hub-2sac.onrender.com`

Do lokalnego testowania backendu wykorzystujemy json-server — serwer REST API oparty na pliku db.json.

Instrukcja uruchomienia lokalnego backendu:

- Zainstaluj json-server globalnie:

  `npm install -g json-server`

- Albo uruchom bez instalacji- upewnij się, że plik db.json znajduje się w katalogu głównym projektu (tam, gdzie
  package.json). Uruchom json-server komendą:

  `npx json-server --watch db.json --port 10000`

**Uwaga:** Port 10000 jest przykładowy — możesz wybrać dowolny dostępny port, ale pamiętaj, żeby ustawić go także w
.env.local.

- Skonfiguruj plik .env.local (który jest ignorowany przez Git, więc jest lokalny dla Twojego środowiska), aby aplikacja
  korzystała z lokalnego backendu:

  `VITE_API_URL=http://localhost:10000`

Backend produkcyjny działa na Render pod adresem:  
[https://help-hub-2sac.onrender.com](https://help-hub-2sac.onrender.com)

### 🆓 Render – darmowy hosting backendu

- Backend hostowany jest na Render w darmowym planie, który usypia aplikację po 15 minutach braku aktywności.
- Aby zapobiec uśpieniu i utrzymać szybkie odpowiedzi, wykorzystujemy narzędzie Uptime Robot.
- Uptime Robot co 5 minut wysyła żądanie GET na główny adres `https://help-hub-2sac.onrender.com`, dzięki czemu backend
  pozostaje aktywny

**Ważne:**
W darmowym planie Render dane przesłane przez metody POST, PUT, DELETE nie są trwałe — backend działa jak tymczasowa
baza danych i po uśpieniu lub restarcie aplikacji zmiany mogą zostać utracone. Do trwałego przechowywania danych
potrzebny jest dedykowany serwer bazy danych lub plan płatny.

## 🧾 Instrukcje użycia

➡️ Dla każdego użytkownika:

- kliknij przycisk na stronie głównej, aby przenieść się do publicznych ogłoszeń,
- użyj filtrów na stronie do wyszukiwania zbiórek w określonych kategoriach,
- do zapisania zbiórek w ulubionych potrzebna jest rejestracja konta i zalogowanie,
- po założeniu konta można zapisać ogłoszenia do ulubionych.

➡️ Dla organizacji pomocowych (w planach):

- do publikacji ogłoszenia potrzebna jest rejestracja organizacji i logowanie,
- po założeniu konta można dodawać ogłoszenia.

## 📊 Możliwości rozwoju aplikacji z podziałem funkcji według MoSCoW

✅ **Must Have**

- Filtrowanie ogłoszeń
    - Wojewódźtwo: Filtrowanie ogłoszeń według województwa
    - Odzież i obuwie: Filtrowanie ogłoszeń według zbiórek z odzieżą i obuwiem
    - Akcesoria: Filtrowanie ogłoszeń według zbiórek z akcesoriami
    - Pilność: Filtrowanie według pilności (żywność, środki higieny osobistej, koce, leki. ).

- Rejestracja i logowanie użytkownika
    - Możliwość założenia konta przez użytkownika
    - Logowanie do istniejącego konta

- Po zalogowaniu użytkownik ma możliwość zarządzanie ulubionymi zbiórkami – czyli dodawanie / usuwanie zbiórek do
  ulubionych

- Możliwość przeglądania listy ogłoszeń w formie paginacji

🌟 **Should Have**

- Licznik ulubionych zbiórek w nagłówku strony, widoczny po zalogowaniu
- Rejestracja i logowanie dla organizacji pomocowych
- Indywidualne dodawanie ogłoszeń przez organizacje pomocowe

💡 **Could Have**

- Modal z potwierdzeniem dodania przez użytkownika ogłoszenia do ulubionych
- Modal z potwierdzeniem dodania ogłoszenia przez organizację
- Filtrowanie ogłoszeń po dodatkowych kategoriach

❌ **Won't Have**

- Formularz płatności
- Możliwość wyboru języka polski / angielski itd.
- Wersja HelpHub_v2.0 – aplikacja z obsługą zbiórek dla zwierząt i przeglądania ogłoszeń adopcji zwierząt w granicach
  Polski 