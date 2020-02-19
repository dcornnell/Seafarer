import React, { Component } from "react";
import JourneyList from "../components/JourneyList";
import UserContext from "../context/UserContext";

class Journeys extends Component {
  static contextType = UserContext;
  render() {
    return (
      <>
        <div className="box">
          <JourneyList />
        </div>
      </>
    );
  }
}

export default Journeys;
