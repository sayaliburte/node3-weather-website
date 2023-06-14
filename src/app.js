const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const views = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", views);
hbs.registerPartials(partials);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sayali Burte",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Weather App",
    name: "Sayali Burte",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "From a  help file: contact 3030",
    title: "Help",
    name: "Sayali Burte",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    errorMessage: "Help article not found",
    name: "Sayali Burte",
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address provided",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      if (
        latitude !== undefined &&
        longitude !== undefined &&
        location !== undefined
      ) {
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: forecastData ,
            location,
            address: req.query.address,
          });
        });
      } 
    }
  );
});

app.get("*", (req, res) => {
  res.render("404page", {
    errorMessage: "Page not found!",
    name: "Sayali Burte",
  });
});

//To listen a app on specific port
app.listen(3000, () => {
  console.log("Server is started on 3000");
});
