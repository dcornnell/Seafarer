var db = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth");

module.exports = function(app) {
  //user login
  app.post("/api/signup", function(req, res) {
    db.User.create(req.body)
      .then(function(result) {
        res.json({ message: "user was created!" });
      })
      .catch(function(err) {
        res.status(500).json({ error: err.message });
      });
  });

  // user authentication
  app.post("/api/authenticate", function(req, res) {
    const { username, password } = req.body;
    db.User.findOne({ username: username }).then(function(dbUser) {
      if (!dbUser) return res.status(401).json({ message: "user not found!" });
      if (dbUser.comparePassword(password)) {
        const token = jwt.sign(
          {
            data: dbUser._id
          },
          process.env.JWT_KEY
        );

        res.json({ id: dbUser._id, username: dbUser.name, token: token });
      } else {
        res.status(401).json({ message: "Username or pasword is incorret" });
      }
    });
  });

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
    const { shipIds, ...eventData } = req.body;
    console.log(shipIds);
    db.Event.create(eventData)
      .then(dbEvent => {
        db.Ship.update(
          { _id: { $in: shipIds } },
          { $push: { events: dbEvent._id } }
        ).then(function() {
          res.json(dbEvent);
        });
      })
      .catch(err => res.status(422).json(err));
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
