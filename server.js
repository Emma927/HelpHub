import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 10000; // PORT env variable: undefined dlatego zawsze będzie lokalny 10000

server.use(middlewares);
server.use(router);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ JSON Server is running at http://localhost:${PORT}`);
  console.log('PORT env variable:', process.env.PORT);
});
