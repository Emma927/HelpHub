# HelpHub

Centralna aplikacja ogłoszeniowa łącząca użytkowników z organizacjami pomocowymi przeprowadzającymi zbiórki ubrań,
obuwia, akcesoriów i żywności w Polsce. Rozwiązuje problem braku jednego miejsca do przeglądania i dodawania zbiórek
przez różne organizacje pomocowe.

## 🚀 Funkcjonalności

- Przeglądanie ogłoszeń
- Filtrowanie ogłoszeń według wybranych kategorii
- Responsywny interfejs
- Rejestracja i logowanie użytkownika
- Dodawanie / usuwanie ogłoszeń z ulubionych
- Routing React Router
- Paginacja stron z ogłoszeniami

## 🛠️ Technologie

- Vite
- React
- Sass (w kodzie został zastosowany @import ze względu na zgodność z biblioteką Bootstrap)
- React Router
- JSON server (używany jako baza danych dla ogłoszeń i użytkowników)
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

   `git clone https://github.com/Emma927/HelpHub.git`

3. **Przejdź do głównego folderu w terminalu**

   Przejdź do katalogu projektu, aby móc uruchamiać polecenia npm:

   `cd help-hub`

4. **Zainstaluj aplikację**

   Zainstaluj wszystkie potrzebne zależności:

   `npm install`

5. **Uruchom aplikację w trybie developerskim**

   Aby uruchomić aplikację w trybie developerskim, użyj:

   `npm run dev`

6. **Buduj aplikację do produkcji**

   Przygotuj aplikację do wdrożenia w środowisku produkcyjnym:

   `npm run build`

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

❌ **Won't Have**

- Filtrowanie ogłoszeń po dodatkowych kategoriach
- Formularz płatności
- Możliwość wyboru języka polski / angielski itd.
- Wersja HelpHub_v2.0 – aplikacja z obsługą zbiórek dla zwierząt i przeglądania ogłoszeń adopcji zwierząt w granicach
  Polski 