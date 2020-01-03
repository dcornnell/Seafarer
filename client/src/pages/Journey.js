import React from "react";
import L from "leaflet";
//import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./Journey.css";

//components
import Container from "../components/Container.js";
import Map from "../components/Map";
import About from "../components/About";
import EventList from "../components/EventList";
import Event from "../components/Event";

//import icon from "leaflet/dist/images/marker-icon.png";
//import iconShadow from "leaflet/dist/images/marker-shadow.png";

import axios from "axios";

class App extends React.Component {
  state = {
    about: {},
    events: [],
    min_bounds: [],
    max_bounds: []
  };

  generateInfo() {
    const id = this.props.match.params.id;
    axios.get("/journeys/" + id).then(res => {
      const about = res.data;
      const events = res.data.ships[0].events;

      //generate the bounds for the map
      const boundsArray = [];
      events.map(function(event) {
        boundsArray.push([
          event.location.coordinates[1],
          event.location.coordinates[0]
        ]);
        return boundsArray;
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
        <Map
          bounds={[this.state.min_bounds, this.state.max_bounds]}
          events={this.state.events}
        />
      );
    } else return <div>Map Not Found</div>;
  }

  render() {
    return (
      <>
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
