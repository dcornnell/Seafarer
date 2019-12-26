import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import axios from "axios";

let DefaultIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/iconic/open-iconic/master/png/map-marker-8x.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

L.Marker.prototype.options.icon = DefaultIcon;

class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
    events: [],
    min_bounds: [],
    max_bounds: []
  };

  generatePoints() {
    axios.get("/journeys/5dfc26f23a7cb0d6b324d79a").then(res => {
      const events = res.data.ships[0].events;
      const boundsArray = [];
      events.map(function(event) {
        boundsArray.push([
          event.location.coordinates[1],
          event.location.coordinates[0]
        ]);
      });
      const bounds = L.bounds(boundsArray);

      this.setState({
        events: events,
        min_bounds: [bounds.min.x, bounds.min.y],
        max_bounds: [bounds.max.x, bounds.max.y]
      });
    });
  }

  componentDidMount() {
    this.generatePoints();
  }

  render() {
    if (this.state.max_bounds.length > 0 && this.state.min_bounds.length > 0) {
      console.log(this.state.min_bounds);
      console.log(this.state.max_bounds);
      return (
        <>
          <Map
            className="map"
            bounds={[this.state.min_bounds, this.state.max_bounds]}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.state.events.map(event => {
              const position = [
                event.location.coordinates[1],
                event.location.coordinates[0]
              ];

              return (
                <Marker position={position}>
                  <Popup>{event.description}</Popup>
                </Marker>
              );
            })}
          </Map>
        </>
      );
    } else return null;
  }
}

export default App;
