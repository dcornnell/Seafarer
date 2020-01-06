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
    console.log(req.body);
    db.Event.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

  app.put("/shipstoevent", function(req, res) {
    const { eventId, shipIds } = req.body;
    shipIds.map(id => {
      db.Ship.findOneAndUpdate(
        { _id: id },
        { $push: { events: eventId } },
        { new: true }
      ).then(function(response) {
        console.log(response);
        res.json(response);
      });
    });
  });

  app.post("/journeys/create", function(req, res) {
    console.log(req.body);
    db.Journey.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
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

  //all ships
  app.get("/ships/all", function(req, res) {
    db.Ship.find().then(function(ships) {
      res.json(ships);
    });
  });
};
