import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import axios from "axios";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
    events: []
  };

  generatePoints() {
    axios.get("/journeys/5dfc26f23a7cb0d6b324d79a").then(res => {
      const events = res.data.ships[0].events;

      this.setState({ events });
      console.log(this.state.events);
    });
  }

  componentDidMount() {
    this.generatePoints();
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <>
        <Map className="map" center={position} zoom={this.state.zoom}>
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
          <Marker position={position}>
            <Popup></Popup>
          </Marker>
        </Map>
      </>
    );
  }
}

export default App;
