// Mock API using json-server.
// Required on Render because there is no real backend.
// Uses PORT from environment in production and 3020 locally.
import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3020;

// Allow requests from Netlify / other domains
server.use(cors());

server.use(middlewares); 

server.use(router);
// Required for Render to expose the service publicly
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ JSON Server is running at http://localhost:${PORT}`);
  console.log('PORT env variable:', process.env.PORT);
});
