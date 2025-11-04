// Konfiguracja serwera API opartego na json-server do mockowania backendu w czasie developmentu. Server.js z json-server jest potrzebny na Render, bo tam nie ma lokalnego backendu – dzięki niemu można uruchomić mockowane API z db.json, żeby frontend miał dostęp do danych podczas hostingu.
import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create(); // Tworzy nowy serwer
const router = jsonServer.router('db.json'); // Wskazuje plik z danymi (baza JSON)
const middlewares = jsonServer.defaults(); // Dodaje domyślne middleware (np. CORS, logger). Z CORS → frontend (np. na porcie 3000) może pobierać dane z backendu (3020).

// Jawne włączenie CORS dla frontendu
server.use(cors({
  origin: 'https://help-hub-render.netlify.app', // albo '*' dla wszystkich
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

const PORT = process.env.PORT || 3020; // Oznacza, że serwer użyje portu podanego przez Render (process.env.PORT), a jeśli nie jest ustawiony podczas lokalnego uruchomienia, użyje domyślnie 3020.

server.use(middlewares); // Middleware to funkcje, które działają po drodze, między zapytaniem a odpowiedzią serwera, json-server ma wbudowane middleware
server.use(router); // Podłącza router z pliku db.json
// 0.0.0.0 to adres IP, nasłuchuje na publicznym interfejsie IP, który Render przydzieli
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ JSON Server is running at http://localhost:${PORT}`);
  console.log('PORT env variable:', process.env.PORT);
});
