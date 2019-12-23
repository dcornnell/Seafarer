import React from "react";
import L from "leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "./Map.css";

class Map extends React.Component {
  componentDidMount() {
    this.map = L.map("mapid").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
  render() {
    return <div id="mapid"></div>;
  }
}

export default Map;
