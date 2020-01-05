import React, { Component } from "react";
import JourneyForm from "../components/JourneyForm";
import EventForm from "../components/EventForm";
import Map from "../components/Map";
import axios from "axios";
import API from "../util/API";
import About from "../components/About";
import _ from "lodash";
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
    dataReceived: false,
    currentJourney: "",
    currentJourneyData: {}
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
        self.setState({
          currentJourney: response.data._id,
          formSubmitted: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  getJourney = () => {
    const self = this;
    API.getJourney(this.state.currentJourney).then(function(response) {
      const currentJourneyData = response.data;
      self.setState({
        dataReceived: true,
        ...currentJourneyData,
        currentJourneyData
      });
    });
  };
  componentDidUpdate() {}

  conditionalRender = () => {
    if (
      this.state.formSubmitted === false &&
      _.isEmpty(this.state.currentJourneyData)
    ) {
      return (
        <JourneyForm
          onSubmit={childState => {
            this.handleFormSubmit(childState);
          }}
        />
      );
    } else if (
      this.state.formSubmitted === true &&
      _.isEmpty(this.state.currentJourneyData)
    ) {
      this.getJourney();
      return <div> getting data </div>;
    } else if (this.state.dataReceived) {
      const {
        name,
        description,
        start_date,
        end_date
      } = this.state.currentJourneyData;
      return (
        <About
          name={name}
          description={description}
          start_date={start_date}
          end_date={end_date}
        />
      );
    }
  };

  render() {
    return (
      <>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical">
            <div className="tile is-child card is-primary">
              {this.conditionalRender()}
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
        <button
          onClick={() => {
            console.log(this.state.currentJourneyData);
          }}
        >
          durr
        </button>
      </>
    );
  }
}

export default CreateJourney;
