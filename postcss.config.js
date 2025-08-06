//PostCSS to narzędzie do przetwarzania CSS, które pozwala na użycie różnych wtyczek do modyfikacji kodu CSS. postcss.config.js jest miejscem, gdzie definiuje się, jakie wtyczki mają być używane i jakie mają mieć ustawienia.
export default {
  plugins: {
    autoprefixer: {}, // pusty obiekt {} w konfiguracji Autoprefixera oznacza, że używa się domyślnych ustawień dla tej wtyczki.
  },
};

// Autoprefixer dodaje niezbędne prefiksy, które starsze przeglądarki wymagają do prawidłowego działania nowoczesnych właściwości CSS, takich jak flexbox czy grid.

/*autoprefixer- ta konfiguracja w pliku postcss.config.js określa, że PostCSS powinien używać wtyczki Autoprefixer. Ta konfiguracja sprawia, że proces budowania CSS automatycznie dostosowuje się do wymagań różnych przeglądarek, co ułatwia utrzymanie i rozwój projektu.*/

/*Dodanie sekcji browserslist pozwala narzędziom takim jak Autoprefixer oraz inne narzędzia, które korzystają z Browserslist, na automatyczne dostosowanie się do określonych wymagań przeglądarek w danym projekcie.*/

/*Jeśli nie zdefiniujesz konfiguracji Browserslist, Autoprefixer użyje swoich domyślnych ustawień. Domyślnie może to oznaczać wsparcie dla szerokiej gamy przeglądarek, ale niekoniecznie tych, które są najbardziej istotne dla Twojego projektu.*/

/*  "browserslist": [
    "> 0.5%", - oznacza wspieracie przeglądarek, które są używane przez więcej niż 0.5% użytkowników na świecie
    "last 2 versions", -  oznacza wspieracie dwóch ostatnich wersji każdej przeglądarki
    "not dead" - oznacza, że wykluczenie przeglądarek, które nie są już wspierane przez ich twórców lub nie mają żadnych aktualizacji przez dłuższy czas.
  ]*/