/**
 * Ariel Gleason
 * Example server for demonstrating routing.
 * Note the use of Express in this version.
 * The assignment notes indicate no 3rd party modules should be used.
 * However, the use of Express made this both cleaner and, well, functional.
 * See 01-routing2.js in this directory for the original version.
 */

const http = require("http");
const port = process.env.PORT || 5000;
const express = require("express");
const parser = require("cookie-parser"); //This is what I needed Express for.
const routes = [
  "welcome",
  "redirect",
  "redirected",
  "cache",
  "cookie",
  "check-cookies",
  "other",
];

// http://localhost:5000/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5000/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5000/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5000/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5000/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5000/other, this exercise should return a status code 404 with '404 - page not found' in html format

const app = express(); //Set up the server.
app.use(parser()); //Pass in cookie-parser.

app.listen(port, (err) => {
  //Server listening on ${port} (currently 5000).
  if (err) {
    console.log("Error setting up server:  " + err);
    throw err;
  }
  console.log(`Listening on port ${port}...`);
});

let getRoutes = () => {
  //Build a list of links for the root index.
  let result = "";
  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
  );
  return result;
};

app.get("/", (req, res) => {
  //The index route.
  let routeResults = getRoutes(); //Get the list of routes.
  res.writeHead(200, { "Content-Type": "text/html" }, { "shortcut-icon": "#" }); //Set header and status code.
  res.write(`<h1>Exercise 01</h1>`); //Add html.
  res.write(`<ul> ${routeResults} </ul>`); //More html.
  res.end(); //Response complete.
});

app.get("/welcome", (req, res) => {
  //Welcome route- create basic html with welcome heading to display.
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h1>Welcome!</h1>`);
  res.end();
});

app.get("/redirect", (req, res) => {
  //Redirect route- reroute to /redirected.
  res.writeHead(302, { Location: "/redirected" });
  res.end();
});

app.get("/redirected", (req, res) => {
  //Redirected route- Create landing page for redirection.
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h1>You have been redirected!</h1>`);
  res.write(
    `Unless you clicked the redirected link on the main page. Then you just travelled here.`
  );
  res.end();
});

app.get("/cache", (req, res) => {
  //Cache route- Set cache max age to 1 day and print a message in plain text.
  res.writeHead(
    200,
    { "Content-Type": "text/html" },
    { "Cache-Control": "max-age: 86_400" }
  );
  res.write(`This resource was cached.`);
  res.end();
});

app.get("/cookie", (req, res) => {
  //Cookie route- Set a cookie with the values "hello=world". Add flavor text to website.
  // res.write("cookies... yumm");
  res.cookie(
    "hello",
    "world",
    { expire: 600_000 + Date.now() },
    { SameSite: "None" }
  );

  res.end();
});

app.get("/check-cookies", (req, res) => {
  //Check-cookies route- Checks for cookie from /cookie and prints results on page.
  if (req.cookies.hello) {
    res.write(`yes`);
  }
  else {
    res.write(`no`);
  }
  res.end();
});

app.all("*", (req, res) => {
  //404 error route- return a page displaying a custom error message.
  res.writeHead(404, { "Content-Type": "text/html" });
  res.write(`<h1>404:  Whatever you're looking for, this ain't it.</h1>`);
  return res.end();
});
