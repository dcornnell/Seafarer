import React, { Component } from "react";
import JourneyList from "../components/JourneyList";
import UserContext from "../context/UserContext";
import Upload from "../components/Upload";

class Journeys extends Component {
  static contextType = UserContext;
  render() {
    return (
      <>
        <div className="box">
          <h1 className="title is-6">
            Hello {this.context.user && this.context.user.username}!
          </h1>
        </div>
        <div className="box">
          <JourneyList />
          <Upload />
        </div>
      </>
    );
  }
}

export default Journeys;
