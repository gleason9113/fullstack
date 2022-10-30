const express = require("express");
const axios = require("axios");


const app = express();
const port = process.env.PORT || 5000;

app.set("views", __dirname + "/views");
app.set("view engine", "pug");


const url = "https://restcountries.com/v3.1/all";

//Format response from countries API and return an array containing the requested values.
function parseData(data) {
  let countries = [];
  for (item of data) {
    name = item.name.common; //Get each country's common name
    pop = item.population.toLocaleString(); //Get each country's pop and format the value
    capital = item.capital;
    region = item.region;
    let str = `${name};${pop};${capital};${region}`;
    countries.push(str); //Add string to array
  }

  console.log(countries);
  return countries;
}

app.get("/", (req, res) => {
  res.render("index", {
    heading: "Countries of the World",
    main: "Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world",
  });
});



app.get("/capitals", async (req, res) => {
  try { //Get the data from the server
    let response = await axios({
      url: url,
      method: "GET",
      timeout: 8_000,
      headers: {
        "Content-Type": "text/html",
      },
    });
    if (response.status == 200) { //Got data- format and display according to the requirements of the route.
      let countries = [];
      let str;
      let data = parseData(response.data);
      data.sort();
      for (item of data) {
        let elem = item.split(";");
        let nocap = `no data`;
        elem[2] === "undefined"
          ? (str = `${elem[0]} - ${nocap}`)
          : (str = `${elem[0]} - ${elem[2]}`);
        countries.push(str);
      }
      res.render("page", {
        heading: "Capitals of the World",
        results: countries,
      });
    }
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

app.get("/populous", async (req, res) => {
  try {//Get the data from the server
    let response = await axios({
      url: url,
      method: "GET",
      timeout: 8_000,
      headers: {
        "Content-Type": "text/html",
      },
    });
    if (response.status == 200) {//Got data- format and display according to the requirements of the route.
      let objects = [];
      let populous = [];
      let data = parseData(response.data);
      data.sort();
      for (item of data) {
        let elem = item.split(";");
        let ctry = {
          name: elem[0],
          pop: Number(elem[1].replace(/,/g, "")),
        };
        if (ctry.pop >= 50_000_000) {
          objects.push(ctry);
        } else {
          continue;
        }
      }
      objects.sort((a, b) => (a.pop > b.pop ? -1 : 1));
      for (object of objects) {
        let str = `${object.name} - ${object.pop.toLocaleString()}`;
        populous.push(str);
      }
      console.log(populous);
      res.render("page", {
        heading: "Most Populous Countries",
        results: populous,
      });
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/regions", async (req, res) => {
  try {//Get the data from the server
    let response = await axios({
      url: url,
      method: "GET",
      timeout: 8_000,
      headers: {
        "Content-Type": "text/html",
      },
    });
    if (response.status == 200) {//Got data- format and display according to the requirements of the route.
      let regions = [];
      let map = new Map();
      let areas = [
        "Africa",
        "Americas",
        "Asia",
        "Europe",
        "Oceania",
        "Antarctic",
      ];
      let values = [0, 0, 0, 0, 0, 0];
      for (let i = 0; i < areas.length; i++) {
        map.set(areas[i], values[i]);
      }
      let data = parseData(response.data);
      data.sort();
      for (item of data) {
        let elem = item.split(";");
        map.set(`${elem[3]}`, map.get(`${elem[3]}`) + 1);
      }

      for (let [key, value] of map) {
        let str = key + " - " + value;
        regions.push(str);
      }
      res.render("page", {
        heading: "Regions of the World",
        results: regions,
      });
    }
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

app.all("*", (req, res) => {
  //404 error route- return a page displaying a custom error message.
  res.writeHead(404, { "Content-Type": "text/html" });
  res.write(`<h1>404:  Whatever you're looking for, this ain't it.</h1>`);
  return res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
