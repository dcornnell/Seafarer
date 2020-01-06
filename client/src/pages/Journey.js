import React from "react";
import "leaflet/dist/leaflet.css";
import "./Journey.css";
import Map from "../components/Map";
import About from "../components/About";
import EventList from "../components/EventList";
import Event from "../components/Event";
import axios from "axios";
class Journey extends React.Component {
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
    console.log(this.state.events);
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
          <div className="tile is-8 is-parent">
            <div className="tile is-child card">
              <Map mode="view" events={this.state.events} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Journey;
