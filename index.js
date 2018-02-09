'use strict';

const http = require('http');
const App = require('./server/app');

const hostname = '127.0.0.1';
const port = 3000;
const resUrl = 'http://localhost:9000';

const app = new App(resUrl);

const server = http.createServer((req, res) => {
  app.routing(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
