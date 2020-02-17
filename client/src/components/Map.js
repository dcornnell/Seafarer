import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import boat from "../icons/sailboat.png";

let DefaultIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/iconic/open-iconic/master/png/map-marker-8x.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

let boatIcon = L.icon({
  iconUrl: boat,
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

L.Marker.prototype.options.icon = DefaultIcon;

class Map extends Component {
  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(this.map.mouseEventToLatLng(event));
    }
  };

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
      zoom: 2,

      maxBounds: [],
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          worldCopyJump: true,

          maxBounds: [
            [-90, -180],
            [90, 180]
          ],
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
    this.createMarkers();
    this.createBounds();
    //this.createPath();
  }

  createBounds() {
    const boundsArray = [];
    if (this.props.events) {
      this.props.events.map(function(event) {
        boundsArray.push([
          event.location.coordinates[1],
          event.location.coordinates[0]
        ]);
        return null;
      });
    }
    if (L.bounds(boundsArray).isValid() && this.props.mode === "view") {
      this.map.fitBounds(boundsArray);
    } else {
      console.log("bounds were invalid setting to default");
      //this.map.fitWorld();
    }
  }

  createMarkers() {
    let markers = [];
    if (this.props.events) {
      this.props.events.map(event => {
        if (event._id === this.props.selectedEvent) {
          const marker = new L.marker(
            [
              parseFloat(event.location.coordinates[1]),
              parseFloat(event.location.coordinates[0])
            ],
            { icon: boatIcon }
          );
          markers.push(marker);
        } else {
          const marker = new L.marker([
            parseFloat(event.location.coordinates[1]),
            parseFloat(event.location.coordinates[0])
          ]);
          markers.push(marker);
        }
        return null;
      });
    }
    this.party = L.layerGroup(markers);

    this.party.addTo(this.map);
  }

  createPath() {
    const coords = [];
    this.props.events.map(function(event) {
      coords.push([
        event.location.coordinates[1],
        event.location.coordinates[0]
      ]);
      return null;
    });

    L.polyline(coords, {
      weight: 1,
      color: "black"
    }).addTo(this.map);
  }

  componentDidMount() {
    this.createMap();
  }

  componentDidUpdate() {
    //this is the blink solution leaving it here until im certain the other way doesnt have problems
    // if (this.props.mode === "view") {
    //   this.map.remove();
    //   this.createMap();
    // }
    //removes the old layers
    this.map.removeLayer(this.party);
    this.createMarkers();
    //recenters the map on click
    //this.createBounds();
    //this creates a line between points
    // this.createPath();
  }
  render() {
    // console.log(this.props.events);
    return <div id="mapid" onClick={this.handleClick}></div>;
  }
}
export default Map;
