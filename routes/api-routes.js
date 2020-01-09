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
        console.log(dbUser);
        res.json({ id: dbUser._id, username: dbUser.username, token: token });
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

  app.post("/ships", function(req, res) {
    db.Ship.create(req.body).then(function(response) {
      res.json(response);
    });
  });

  app.post("/events", function(req, res) {
    console.log("im here");
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

  app.post("/api/journeys", function(req, res) {
    console.log(req.body);
    db.Journey.create(req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  });

  //read routes
  app.get("/api/journeys/all", function(req, res) {
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
  app.get("/api/journeys/:id", function(req, res) {
    console.log(req.params.id);
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
