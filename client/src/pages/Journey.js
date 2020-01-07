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
        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical">
            <article className="tile is-child card is-primary">
              <About
                name={this.state.about.name}
                start_date={this.state.about.start_date}
                end_date={this.state.about.end_date}
                description={this.state.about.description}
              />
            </article>
            <div className="tile is-child card is-warning">
              <EventList
                ships={
                  _.isEmpty(this.state.about.ships) === false
                    ? this.state.about.ships
                    : []
                }
                events={this.state.events.length > 0 ? this.state.events : []}
              />
            </div>
          </div>
          <div className="tile is-8 is-parent">
            <div className="tile is-child card">
              <Map mode="view" events={this.state.events} />
            </div>
          </div>
        </div>
        <h1>hello {this.context.user && this.context.user.id}!</h1>
      </>
    );
  }
}

export default Journey;
