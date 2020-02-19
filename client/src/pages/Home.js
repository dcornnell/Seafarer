import React, { Component } from "react";

import UserContext from "../context/UserContext";
import SlideShow from "../components/SlideShow";

class Home extends Component {
  static contextType = UserContext;
  render() {
    return (
      <>
        <div className="box">
          <SlideShow />
        </div>

        <div className="box">
          <h1 className="title">
            Hello {this.context.user && this.context.user.username},
          </h1>
          <p>
            Welcome to Seafarer. A site for viewing and logging historical sea
            voyages. To create new journeys please create an account.
          </p>
        </div>
      </>
    );
  }
}

export default Home;
