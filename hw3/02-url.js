const http = require("http");

const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  const routes = [
    "/attributes?hello=world&lorem=ipsum",
    "/items?first=1&second=2&third=3&fourth=4",
    "/characters?spongebob=squarepants&patrick=star&sandy=cheeks",
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

  let getRoutes = () => {
    let result = "";

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
    );

    return result;
  };

  switch (req.url) {
    case "/":
      let routeResults = getRoutes();
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<h1>Exercise 02</h1>`);
      res.write(`<ul> ${routeResults} </ul>`);
      res.end();
      break;
    case "/attributes?hello=world&lorem=ipsum":
    case "/items?first=1&second=2&third=3&fourth=4":
    case "/characters?spongebob=squarepants&patrick=star&sandy=cheeks":
      res.writeHead(200, { "Content-Type": "text/html" });

      const params = new URLSearchParams(url.searchParams);
      let table = `<table id="table" style="border:1px solid black;"><tr><th style="border:1px solid black;">Key</th><th style="border:1px solid black;">Value</th></tr>`;
      for (entry of params.entries()) {
        table += `<tr><td style="border:1px solid black;">${entry[0]}</td><td style="border:1px solid black;">${entry[1]}</td>`;
      }
      table += `</table>`;
      res.write(table);
      res.end();
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(`<h1>404:  Whatever you're looking for, this ain't it.</h1>`);
      res.end();
  }
  if (req.url === "/") {
  }

  // Add your code here

  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
