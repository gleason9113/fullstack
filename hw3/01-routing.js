const http = require("http");
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  const routes = [
    "welcome",
    "redirect",
    "redirected",
    "cache",
    "cookie",
    "check-cookies",
    "other",
  ];

  let getRoutes = () => {
    let result = "";

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );

    return result;
  };

  //Handling routing with switch statement- I think this is more readable than an extended if/else structure.
  switch (req.url) {
    case "/":
      let routeResults = getRoutes();
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<h1>Exercise 01</h1>`);
      res.write(`<ul> ${routeResults} </ul>`);
      res.end();
      break;
    case "/welcome":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<h1>Welcome!</h1>`);
      res.end();
      break;
    case "/redirect":
      res.writeHead(302, { Location: "/redirected" });
      res.end();
      break;
    case "/redirected":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<h1>You have been redirected!</h1>`);
      res.write(
        `Unless you clicked the redirected link on the main page. Then you just travelled here.`
      );
      res.end();
      break;
    case "/cache":
      res.writeHead(
        200,
        { "Content-Type": "text/html" },
        { "Cache-Control": "max-age: 86_400" }
      );
      res.write(`This resource was cached.`);
      res.end();
      break;
    case "/cookie":
      res.writeHead(
        200,
        { "Set-Cookie": "hello=world; Max-Age=600_000; Same-Site=Lax" },
        { "Content-Type": "text/html" }
      );
      res.write("cookies... yumm");
      res.end();
      break;
    case "/check-cookies":
      if (req.headers.cookie === "hello=world") {
        res.write(`yes`);
      } else {
        res.write(`no`);
      }
      res.end();
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(`<h1>404:  Whatever you're looking for, this ain't it.</h1>`);
      res.end();
  }

  // Add your code here
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
