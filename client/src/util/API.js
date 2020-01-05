import axios from "axios";

export default {
  getShips: function() {
    return axios.get("/ships/all");
  }
};
