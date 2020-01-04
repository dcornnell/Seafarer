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
import JourneyForm from "../components/JourneyForm";
//import icon from "leaflet/dist/images/marker-icon.png";
//import iconShadow from "leaflet/dist/images/marker-shadow.png";

import axios from "axios";

class App extends React.Component {
  state = {
    about: {},
    events: []
  };

  generateInfo() {
    const id = this.props.match.params.id;
    axios.get("/journeys/" + id).then(res => {
      const about = res.data;

      let events = [];

      for (let i = 0; i < about.ships.length; i++) {
        for (let j = 0; j < about.ships[i].events.length; j++) {
          //console.log("the events enddate" + about.ships[i].events[j].end_date);
          //console.log("the Journeys end date" + about.end_date);

          events.push(about.ships[i].events[j]);
        }
      }

      const boundsArray = [];
      events.map(function(event) {
        boundsArray.push([
          event.location.coordinates[1],
          event.location.coordinates[0]
        ]);
        return null;
      });
      let bounds;
      if (boundsArray.length === 0) {
        bounds = L.bounds([[51, 0.1]]);
      } else {
        bounds = L.bounds(boundsArray);
      }

      this.setState({
        about: about,
        events: events
      });
    });
  }

  componentDidMount() {
    this.generateInfo();
  }

  render() {
    return (
      <>
        <Container>
          <div className="grid-x grid-margin-x">
            <div className="cell small-8">
              <Map events={this.state.events} />
            </div>
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
                {this.state.events.map((event, i) => {
                  return (
                    <Event
                      key={i}
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
        <JourneyForm />
      </>
    );
  }
}

export default App;
