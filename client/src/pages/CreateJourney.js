import React, { Component } from "react";
import JourneyForm from "../components/JourneyForm";
import EventForm from "../components/EventForm";
import Map from "../components/Map";
import axios from "axios";
class CreateJourney extends Component {
  state = {
    journeySubmited: false,
    allShips: [],
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    selectedShips: [],
    modal: false,
    formSubmitted: false,
    currentJourney: ""
  };

  handleFormSubmit(childState) {
    const self = this;
    const shipIds = [];
    childState.selectedShips.map(ship => {
      shipIds.push(ship._id);
      return null;
    });

    axios
      .post("/journeys/create", {
        name: childState.name,
        description: childState.description,
        start_date: childState.start_date,
        end_date: childState.end_date,
        ships: shipIds
      })
      .then(function(response) {
        console.log(response);
        self.setState({ currentJourney: response.data._id });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  getJourney() {
    if (this.state.currentJourney !== undefined) {
      console.log("hello");
    } else {
      console.log("the form has been submitted");
    }
  }
  componentDidUpdate() {
    this.getJourney();
  }

  render() {
    return (
      <>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical">
            <div className="tile is-child card is-primary">
              <JourneyForm
                onSubmit={childState => {
                  this.handleFormSubmit(childState);
                }}
              />
            </div>
            <div className="tile is-child card is-warning">
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
