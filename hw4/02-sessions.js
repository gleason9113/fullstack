const express = require("express");
const session = require("express-session");
const memstore = require("memorystore")(session); //Recommended by express-session docs
const app = express();
const port = process.env.PORT || 5000;
const currentRoute = `Currently on route:  `;
const routes = ["spongebob", "patrick", "main", "sandy"];
let getRoutes = () => {
  //Build a list of links for the root index.
  let result = "";
  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
  );
  return result;
};
let routeResults = getRoutes();

let visited = (history) => {
  //Build an html list from the cookie path and return it.
  let list = ``;
  let array = history.split(";");
  array.forEach((elem) => (list += `<li><a href="/${elem}">${elem}</a></li>`));
  return list;
};

app.use(
  session({
    //Setting up the Express session.
    cookie: { maxAge: 14_400 },
    store: new memstore({
      checkPeriod: 14_400,
    }),
    secure: false,
    resave: true,
    secret: "the fnords",
  })
);

app.get("/", (req, res) => {
  // /main redirects to root.
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2>Welcome to localhost:5000!</h2>`);
  res.write(`<h3>${currentRoute}/</h3>`);
  res.write(`Available Routes: `);
  res.write(`<ul> ${routeResults} </ul>`);
  req.session.cookie.path += `;/`;
  res.write(`Previously visited: `);
  res.write(`<ul> ${visited(req.session.cookie.path)} </ul>`);
  res.end();
});

app.get("/spongebob", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h3>${currentRoute}/spongebob</h3>`);
  res.write(`Available Routes: `);
  res.write(`<ul> ${routeResults} </ul>`);
  req.session.cookie.path += `;/spongebob`;
  req.session.page_views++;
  res.write(`Previously visited: `);
  res.write(`<ul> ${visited(req.session.cookie.path)} </ul>`);
  console.log(req.session);
  res.end();
});

app.get("/main", (req, res) => {
  res.writeHead(302, { Location: "/" });
  res.end();
});

app.get("/patrick", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h3>${currentRoute}/patrick</h3>`);
  res.write(`Available Routes: `);
  res.write(`<ul> ${routeResults} </ul>`);
  req.session.cookie.path += `;/patrick`;
  res.write(`Previously visited: `);
  res.write(`<ul> ${visited(req.session.cookie.path)} </ul>`);
  res.end();
});

app.get("/sandy", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h3>${currentRoute}/sandy</h3>`);
  res.write(`Available Routes: `);
  res.write(`<ul> ${routeResults} </ul>`);
  req.session.cookie.path += `;/sandy`;
  res.write(`Previously visited: `);
  res.write(`<ul> ${visited(req.session.cookie.path)} </ul>`);
  res.end();
});

app.all("*", (req, res) => {
  //404 error route- return a page displaying a custom error message.
  res.writeHead(404, { "Content-Type": "text/html" });
  res.write(`<h1>404:  Whatever you're looking for, this ain't it.</h1>`);
  res.write(`Available Routes: `);
  res.write(`<ul> ${routeResults} </ul>`);
  req.session.cookie.path += `;/404error`;
  return res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
