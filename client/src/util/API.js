import axios from "axios";

export default {
  //create a user this should probably be moved to auth
  createUser: function(username, password) {
    return axios.post("/api/signup", {
      username: username,
      password: password
    });
  },

  getEvents: function() {
    return axios.get("/events/all");
  },
  //get all ships
  getShips: function() {
    return axios.get("/ships/all");
  },
  //get a single ship
  getShip: function(id) {
    return axios.get(`/ships/${id}`);
  },
  //get a single Journey
  getJourney: function(id) {
    return axios.get("/api/journeys/" + id);
  },

  createJourney: function(data) {
    return axios.post("/api/journeys", {
      name: data.name,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      ships: data.ships
    });
  },
  //create an event
  createEvent: function(data, shipIds, journeyId) {
    console.log("am i at the api?", data, shipIds);
    const location = {
      coordinates: [data.lng, data.lat],
      type: "Point"
    };
    return axios.post("/events", {
      journeyId: journeyId,
      title: data.title,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      location: location,
      shipIds: shipIds,
      img: data.img
    });
  }
};
