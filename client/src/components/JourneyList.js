import React, { Component } from "react";
import axios from "axios";

class JourneyList extends Component {
  state = {
    journeys: []
  };

  generateList() {
    axios.get("api/journeys/all").then(res => {
      const journeys = res.data;
      this.setState({ journeys: journeys });
    });
  }

  componentDidMount() {
    this.generateList();
  }

  render() {
    return (
      <ul>
        {this.state.journeys.map((state, i) => {
          return <li key={i}>{state.name}</li>;
        })}
      </ul>
    );
  }
}

export default JourneyList;
