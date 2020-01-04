import React, { Component } from "react";
import JourneyForm from "../components/JourneyForm";
import EventForm from "../components/EventForm";
import Map from "../components/Map";
class CreateJourney extends Component {
  state = {
    journeySubmited: false
  };

  render() {
    return (
      <>
        <div className="tile is-ancestor">
          <div class="tile is-parent is-vertical">
            <dev class="tile is-child card is-primary">
              <JourneyForm />
            </dev>
            <div class="tile is-child card is-warning">
              <EventForm />
            </div>
          </div>
          <div className="tile is-8 is-parent">
            <div className="tile is-child card">
              <Map />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreateJourney;
