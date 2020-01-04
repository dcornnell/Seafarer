import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Journeys extends Component {
  state = {
    journeys: []
  };

  getJourneys() {
    axios.get("/journeys/all").then(res => {
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
        <ul>
          {this.state.journeys.map(journey => {
            return (
              <li key={journey._id}>
                <Link to={"/journeys/" + journey._id}>{journey.name}</Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Journeys;
