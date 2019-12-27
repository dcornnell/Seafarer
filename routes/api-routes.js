var db = require("../models");
module.exports = function(app) {
  //create routes
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
  //read routes
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
  // single journey
  app.get("/journeys/:id", function(req, res) {
    const id = req.params.id;
    db.Journey.findById(id)
      .populate({
        path: "ships",
        populate: [{ path: "captains" }, { path: "events" }]
      })
      .then(function(response) {
        res.json(response);
      });
  });
};