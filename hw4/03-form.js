const http = require("http");
const express = require("express");
const parser = require("body-parser");
let fs = require("fs");
const port = process.env.PORT || 5001;
const routes = ["form", "submit"];

let getRoutes = () => {
  //Build a list of links for the root index.
  let result = "";
  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
  );
  return result;
};

const app = express();
app.use(parser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.writeHead(302, { Location: "/form" });
  res.end(); //Response complete.
});

app.get("/form", (req, res) => {
  //res.set('Content-Type', "text/html");
  fs.readFile("03-form.html", "utf8", (err, data) => {
    if (err) {
      res.write("Whoops! File not found!");
    } else {
      res.write(data);
    }
    res.end();
  });
});

app.post("/submit", (req, res) => {
  let name = `Name: ` + req.body.name;
  let email = `Email:  ` + req.body.email;
  let msg;
  let spam;
  if (req.body.message) {
    msg = `Comments: ` + req.body.message;
  } else {
    msg = `Comments:  N/A`;
  }

  if (req.body.spam) {
    spam = `Newsletter:  Yes, I would like to sign up for the newsletter.`;
  } else {
    spam = `Newsletter: No, thank you.`;
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h4>${name}</h4>`);
  res.write(`<h4>${email}</h4>`);
  res.write(`<h4>${msg}</h4>`);
  res.write(`<h4>${spam}</h4>`);
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
