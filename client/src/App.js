import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./App.css";

//components
import Container from "./components/Container.js";
import About from "./components/About";
import NavBar from "./components/NavBar";
import EventList from "./components/EventList";
import Event from "./components/Event";

//import icon from "leaflet/dist/images/marker-icon.png";
//import iconShadow from "leaflet/dist/images/marker-shadow.png";

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
    about: {},
    events: [],
    min_bounds: [],
    max_bounds: []
  };

  generateInfo() {
    axios.get("/journeys/5dfc26f23a7cb0d6b324d79a").then(res => {
      const about = res.data;
      const events = res.data.ships[0].events;

      //generate the bounds for the map
      const boundsArray = [];
      events.map(function(event) {
        boundsArray.push([
          event.location.coordinates[1],
          event.location.coordinates[0]
        ]);
      });
      const bounds = L.bounds(boundsArray);

      this.setState({
        about: about,
        events: events,
        min_bounds: [bounds.min.x, bounds.min.y],
        max_bounds: [bounds.max.x, bounds.max.y]
      });
    });
  }

  componentDidMount() {
    this.generateInfo();
  }

  renderMap() {
    if (this.state.max_bounds.length > 0 && this.state.min_bounds.length > 0) {
      return (
        <>
          <Map
            className="map"
            bounds={[this.state.min_bounds, this.state.max_bounds]}
            boundsOptions={{ padding: [10, 10] }}
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
    } else return <div>Map Not Found</div>;
  }

  render() {
    return (
      <>
        <NavBar />
        <Container>
          <div className="grid-x grid-margin-x">
            <div className="cell small-8">{this.renderMap()}</div>
            <div className="cell small-4">
              <About
                name={this.state.about.name}
                start_date={this.state.about.start_date}
                end_date={this.state.about.end_date}
                description={this.state.about.description}
              />
            </div>
          </div>
          <div className="grid-x grid-margin-x">
            <div className="cell small-4"></div>
            <div className="cell small-4"></div>
            <div className="cell small-4">
              <EventList>
                {this.state.events.map(event => {
                  return (
                    <Event
                      start_date={event.start_date}
                      end_date={event.end_date}
                      description={event.description}
                    />
                  );
                })}
              </EventList>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

export default App;
