//PostCSS to narzędzie do przetwarzania CSS, które pozwala na użycie różnych wtyczek do modyfikacji kodu CSS. postcss.config.js jest miejscem, gdzie definiuje się, jakie wtyczki mają być używane i jakie mają mieć ustawienia.
export default {
  plugins: {
    autoprefixer: {}, // pusty obiekt {} w konfiguracji Autoprefixera oznacza, że używa się domyślnych ustawień dla tej wtyczki.
  },
};

// Autoprefixer dodaje niezbędne prefiksy, które starsze przeglądarki wymagają do prawidłowego działania nowszych właściwości CSS, takich jak flexbox czy grid.