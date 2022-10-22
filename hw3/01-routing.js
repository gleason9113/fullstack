const http = require('http');
const port = process.env.PORT || 5000;
const express = require('express');
const parser = require('cookie-parser');
const routes = [
  'welcome',
  'redirect',
  'redirected',
  'cache',
  'cookie',
  'check-cookies',
  'other',
];

// http://localhost:5000/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5000/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5000/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5000/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5000/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5000/other, this exercise should return a status code 404 with '404 - page not found' in html format


  const app = express();
  app.use(parser());

  app.listen(port, (err) => {
    if(err) {
      throw(err);
    }
    console.log(`Listening on port ${port}...`);
  });

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );

    return result;
  };
  
  app.get('/', (req, res) => {
    let routeResults = getRoutes();
      res.writeHead(200, { 'Content-Type': 'text/html' }, { 'shortcut-icon': '#'});
      res.write(`<h1>Exercise 01</h1>`);
      res.write(`<ul> ${routeResults} </ul>`);
      res.end();
  });

  app.get('/welcome', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Welcome!</h1>`);
    res.end();
  });

  app.get('/redirect', (req, res) => {
    res.writeHead(302, { 'Location': '/redirected' });
    res.end();
  });

  app.get('/redirected', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>You have been redirected!</h1>`);
    res.write(`Unless you clicked the redirected link on the main page. Then you just travelled here.`);
    res.end();
  })

  app.get('/cache', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`This resource was cached.`);
    res.end();
  });

  app.get('/cookie', (req, res) => {
    res.cookie("hello", "world");
    res.write('cookies... yumm');
    res.end();
  });

  app.get('/check-cookies', (req, res) => {
    if (req.cookies == undefined) {
      res.write('no');
    } else {
      res.write('yes');
    }
    res.end();
  });

  app.all('*', (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/html'});
    res.write(`<h1>404:  Whatever you're looking for, this ain't it.</h1>`);
    res.end();
  });
  





/*

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  } else if (req.url === '/welcome') {
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.write(`<h1>Welcome!</h1>`);
  }

  const server = http.createServer((req, res) => {
  const routes = [
    'welcome',
    'redirect',
    'redirected',
    'cache',
    'cookie',
    'check-cookies',
    'other',
  ];

  switch (req.url) {
    case '/': 
      let routeResults = getRoutes();
      res.writeHead(200, { 'Content-Type': 'text/html' }, { 'shortcut-icon': '#'});

      res.write(`<h1>Exercise 01</h1>`);
      res.write(`<ul> ${routeResults} </ul>`);
      res.end();
      break;
    case '/welcome':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<h1>Welcome!</h1>`);
      res.end();
      break;
    case '/redirect':
      res.writeHead(302, { 'Location': '/redirected' });
      res.end();
      break;
    case '/cache':
      res.writeHead(200, { 'Content-Type': 'text/html' }, { 'Cache-Control': 'max-age=1'});
      res.write(`This resource was cached.`);
      res.end();
      break;
    case '/cookie':
      let cookie = {
        "hello": "world",
        "visited": "true",
        "Max-Age": 600_000,
      }
      res.write('cookies... yumm');
      res.end();
      break;
    case '/check-cookies':
      res.writeHead(200, {'Content-Type': 'text/html'});
      if (req.cookies == undefined) {
        res.write('no');
      } else {
        res.write('yes');
      }
      res.end();
      break;
    default: 
      res.writeHead(404, { 'Content-Type': 'text/html'});
      res.write(`<h1>404:  Whatever you're looking for, this ain't it.</h1>`);
      res.end();
  };

*/