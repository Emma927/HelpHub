//Ten fragment kodu to konfiguracja prostego serwera API opartego na json-server. To bardzo przydatne narzędzie do mockowania backendu (np. w czasie developmentu). Potrzebne są zmienne środowiskowe na Render więc musiał powstać server.js
import jsonServer from 'json-server';

const server = jsonServer.create(); // Tworzy nowy serwer
const router = jsonServer.router('db.json'); // Wskazuje plik z danymi (baza JSON)
const middlewares = jsonServer.defaults(); // Dodaje domyślne middleware (np. CORS, logger)

const PORT = process.env.PORT || 10000; // PORT env variable: undefined, dlatego zawsze będzie lokalny 10000

server.use(middlewares); // Middleware to funkcje, które działają po drodze, między zapytaniem a odpowiedzią serwera, json-server ma wbudowane middleware
server.use(router); // Podłącza router z pliku db.json
// 0.0.0.0 to adres IP, nasłuchuje na publicznym interfejsie IP, który Render przydzieli
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ JSON Server is running at http://localhost:${PORT}`);
  console.log('PORT env variable:', process.env.PORT);
});
