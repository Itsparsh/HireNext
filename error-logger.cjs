const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/log') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      console.log('--- BROWSER ERROR CAUGHT ---');
      console.log(body);
      fs.appendFileSync('browser-errors.log', body + '\n');
      res.writeHead(200);
      res.end('Logged');
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(9999, () => {
  console.log('Error logger listening on port 9999');
});
