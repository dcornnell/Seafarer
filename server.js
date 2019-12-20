const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

var db = require("./models");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/seafarer", { useNewUrlParser: true });

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.post("/people/create", function(req, res) {
  db.Person.create(req.body).then(function(response) {
    res.json(response);
  });
});

app.post("/ships/create", function(req, res) {
  db.Ship.create(req.body).then(function(response) {
    res.json(response);
  });
});

app.post("/events/create", function(req, res) {
  db.Event.create(req.body).then(function(response) {
    res.json(response);
  });
});

app.post("/journeys/create", function(req, res) {
  db.Journey.create(req.body).then(function(response) {
    res.json(response);
  });
});

app.get("/journeys/all", function(req, res) {
  db.Journey.find()
    .populate({
      path: "ships",
      populate: [{ path: "captains" }, { path: "events" }]
    })
    .then(function(response) {
      res.json(response);
    });
});
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
