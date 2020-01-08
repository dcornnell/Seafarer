import React from "react";
import "leaflet/dist/leaflet.css";
import "./Journey.css";
import Map from "../components/Map";
import About from "../components/About";
import EventList from "../components/EventList";
import axios from "axios";
import UserContext from "../context/UserContext";
import _ from "lodash";

class Journey extends React.Component {
  static contextType = UserContext;

  state = {
    about: {},
    events: [],
    selectedShip: ""
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

      this.setState({
        about: about,
        events: events
      });
    });
  }

  changeTab(childState) {
    const { selectedShip } = childState;
    this.setState({ selectedShip: selectedShip }, () => {
      this.filterEvents(this.state.about.ships, selectedShip);
    });
  }

  filterEvents = (ships, shipId) => {
    console.log(shipId);
    if (shipId !== 0) {
      let ship = ships.filter(ship => ship._id === shipId);
      console.log(ship[0].events);
      this.setState({ events: ship[0].events });
    }
    if (shipId === 0) {
      let events = [];
      console.log(this.state.about.ships);
      for (let i = 0; i < this.state.about.ships.length; i++) {
        for (let j = 0; j < this.state.about.ships[i].events.length; j++) {
          events.push(this.state.about.ships[i].events[j]);
        }
      }
      this.setState({ events: events });
    }
  };

  componentDidMount() {
    this.generateInfo();
  }

  render() {
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
                onClick={childState => {
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

            <div className="box">
              <h1>hello {this.context.user && this.context.user.id}!</h1>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Journey;
