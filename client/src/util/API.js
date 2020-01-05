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
  }
};
