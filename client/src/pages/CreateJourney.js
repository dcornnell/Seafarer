import React, { Component } from "react";
import JourneyForm from "../components/JourneyForm";
import EventForm from "../components/EventForm";
import Map from "../components/Map";
class CreateJourney extends Component {
  render() {
    return (
      <>
        <Map />
        <JourneyForm />
        <EventForm />
      </>
    );
  }
}

export default CreateJourney;
