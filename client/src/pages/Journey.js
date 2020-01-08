import React from "react";
import "leaflet/dist/leaflet.css";
import "./Journey.css";
import Map from "../components/Map";
import About from "../components/About";
import EventList from "../components/EventList";
import axios from "axios";
import UserContext from "../context/UserContext";
import _ from "lodash";
import EventCard from "../components/EventCard";

class Journey extends React.Component {
  static contextType = UserContext;

  state = {
    about: {},
    events: [],
    selectedShip: "",
    selectedEvent: ""
  };

  generateInfo() {
    const id = this.props.match.params.id;
    axios.get("/api/journeys/" + id).then(res => {
      const about = res.data;

      let events = [];

      for (let i = 0; i < about.ships.length; i++) {
        for (let j = 0; j < about.ships[i].events.length; j++) {
          events.push(about.ships[i].events[j]);
        }
      }

      this.setState({
        about: about,
        events: events
      });
    });
  }

  getEvent(events, eventId) {
    let event = events.filter(event => event._id === eventId);
    return event;
  }

  changeTab(childState) {
    const { selectedShip } = childState;
    const events = this.filterEvents(this.state.about.ships, selectedShip);
    this.setState({ selectedShip: selectedShip, events: events });
  }

  eventClick(childState) {
    const { selectedEvent } = childState;
    this.setState({ selectedEvent: selectedEvent });
  }

  filterEvents = (ships, shipId) => {
    if (shipId !== 0) {
      let ship = ships.filter(ship => ship._id === shipId);
      return ship[0].events;
      //this.setState({ events: ship[0].events });
    }
    if (shipId === 0) {
      let events = [];

      for (let i = 0; i < this.state.about.ships.length; i++) {
        for (let j = 0; j < this.state.about.ships[i].events.length; j++) {
          events.push(this.state.about.ships[i].events[j]);
        }
      }
      //this.setState({ events: events });
      return events;
    }
  };

  componentDidMount() {
    this.generateInfo();
    this.getEvent(this.state.events, this.state.selectedEvent);
  }

  componentDidUpdate() {
    this.getEvent(this.state.events, this.state.selectedEvent);
  }

  render() {
    console.log(this.state.events);
    return (
      <>
        <article className="box is-primary">
          <About
            name={this.state.about.name}
            start_date={this.state.about.start_date}
            end_date={this.state.about.end_date}
            description={this.state.about.description}
          />
        </article>
        <div className="columns">
          <div className="column">
            <div className="card is-warning">
              <EventList
                onEventClick={childState => {
                  this.eventClick(childState);
                }}
                onTabClick={childState => {
                  this.changeTab(childState);
                }}
                ships={
                  _.isEmpty(this.state.about.ships) === false
                    ? this.state.about.ships
                    : []
                }
                events={this.state.events.length > 0 ? this.state.events : []}
              />
            </div>
          </div>
          <div className="column is-two-thirds">
            <div className="box is-paddingless ">
              <Map mode="view" events={this.state.events} />
            </div>

            <EventCard
              event={
                this.state.selectedEvent
                  ? this.getEvent(this.state.events, this.state.selectedEvent)
                  : []
              }
            />
          </div>
        </div>
        <div className="box">
          <h1>hello {this.context.user && this.context.user.id}!</h1>
        </div>
      </>
    );
  }
}

export default Journey;
