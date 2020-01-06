import axios from "axios";
//get all ships
export default {
  getShips: function() {
    return axios.get("/ships/all");
  },
  //get a single ship
  getShip: function(id) {
    return axios.get(`/ships/${id}`);
  },
  //get a single Journey
  getJourney: function(id) {
    return axios.get("/journeys/" + id);
  },

  //adds an Event to ships
  eventToShips: function(eventId, shipIds) {
    console.log("whatep");
    return axios.put("/shipstoevent", {
      eventId: eventId,
      shipIds: shipIds
    });
  },
  //create a Journey
  createJourney: function(data) {
    return axios.post("/journeys/create", {
      name: data.name,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      ships: data.ships
    });
  },
  //create an event
  createEvent: function(data) {
    const location = {
      coordinates: [data.lng, data.lat],
      type: "Point"
    };
    return axios.post("/events/create", {
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      location: location
    });
  }
};
