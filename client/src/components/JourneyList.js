import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

class JourneyList extends Component {
  state = {
    journeys: []
  };

  getJourneys() {
    axios.get("/api/journeys/all").then(res => {
      const journeys = res.data;
      this.setState({ journeys: journeys });
    });
  }

  componentDidMount() {
    this.getJourneys();
  }
  render() {
    return (
      <>
        {this.state.journeys.map(journey => {
          return (
            <article className="media" key={journey._id}>
              <div className="media-content">
                <div className="content ">
                  <Link className="is-5" to={"/journeys/" + journey._id}>
                    {journey.name}
                  </Link>
                </div>
              </div>
              <div className="media-right">
                {moment(journey.start_date).format("MMM Do YYYY")}-
                {moment(journey.end_date).format("MMM Do YYYY")}
              </div>
            </article>
          );
        })}
      </>
    );
  }
}

export default JourneyList;
