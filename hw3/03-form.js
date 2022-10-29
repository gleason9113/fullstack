const http = require("http");
const port = process.env.PORT || 5001;
let fs = require("fs");

const server = http.createServer((req, res) => {
  const routes = ["form", "submit"];
  let getRoutes = () => {
    let result = "";
    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );
    return result;
  };

  switch (req.url) {
    case "/":
      res.writeHead(302, { Location: "/form" });
      res.end();
      break;
    case "/form":
      let form = fs.readFileSync("03-form.html");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(form);
      break;
    case "/submit":
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        let name;
        let email;
        let msg;
        let spam;
        let rawData = body.toString();
        let fields = rawData.split("&");
        console.log(fields);
        name = `Name:  ` + fields[0].split("=")[1];
        email = `Email:  ` + fields[1].split("=")[1];
        if (fields[2] === "message=") {
          msg = `Comments:  n/a`;
        } else {
          msg = `Comments:  ` + fields[2].split("=")[1];
        }
        if (fields.length === 4) {
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

      break;
    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(`<h1>404:  Whatever you're looking for, this ain't it.</h1>`);
      res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered
