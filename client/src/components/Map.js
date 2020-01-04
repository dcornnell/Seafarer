import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

let DefaultIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/iconic/open-iconic/master/png/map-marker-8x.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

L.Marker.prototype.options.icon = DefaultIcon;

class Map2 extends Component {
  getBounds() {
    const boundsArray = [];
    this.props.events.map(function(event) {
      boundsArray.push([
        event.location.coordinates[1],
        event.location.coordinates[0]
      ]);
      return null;
    });
    let bounds;
    if (L.bounds(boundsArray)) {
      bounds = L.bounds(boundsArray);
    } else {
      console.log("bounds were invalid setting to default");
      bounds = L.bounds([-90, -180], [90, 180]);
    }

    return bounds;
  }
  createMap() {
    this.map = L.map("mapid", {
      center: [49.8419, 24.0315],
      zoom: 16,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
    const boundsArray = [];
    this.props.events.map(function(event) {
      boundsArray.push([
        event.location.coordinates[1],
        event.location.coordinates[0]
      ]);
      return null;
    });

    if (L.bounds(boundsArray).isValid()) {
      this.map.fitBounds(boundsArray);
      console.log("bounds should be good to go");
    } else {
      console.log("bounds were invalid setting to default");
      this.map.fitWorld();
    }
    console.log(this.props.events);
    this.props.events.map(event => {
      console.log(event);
      const marker = new L.marker([
        parseFloat(event.location.coordinates[1]),
        parseFloat(event.location.coordinates[0])
      ]).addTo(this.map);
    });
  }
  componentDidMount() {
    this.createMap();
  }

  render() {
    return <div id="mapid"></div>;
  }
}
export default Map2;
