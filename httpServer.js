'use strict';

const http = require('http');
const fs = require('fs');

const pets = JSON.parse(fs.readFileSync('pets.json', 'utf-8'));

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/pets') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(pets));
    } else if (req.url.match(/^\/pets\/(\d+)$/)) {
      const index = parseInt(req.url.split('/')[2]);
      if (index < 0 || index >= pets.length) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(pets[index]));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(8000, () => {
  console.log('Server listening on port 8000');
});
