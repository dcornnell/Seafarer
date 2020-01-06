import React, { Component } from "react";
import JourneyForm from "../components/JourneyForm";
import EventForm from "../components/EventForm";
import Map from "../components/Map";

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
    currentJourneyId: "",
    currentJourneyData: {},
    eventData: {},
    clickedLatLng: {}
  };
  //
  eventFormSubmit(childState) {
    API.createEvent(childState)
      .then(function(response) {
        const shipIds = childState.selectedShips;
        const eventId = response.data._id;
        console.log("the ships", shipIds);
        console.log("the event", eventId);
        API.eventToShips(eventId, shipIds);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  journeyFormSubmit(childState) {
    const self = this;
    const shipIds = [];
    childState.selectedShips.map(ship => {
      shipIds.push(ship._id);
      return null;
    });
    const data = { ...childState, ships: shipIds };

    API.createJourney(data)
      .then(function(response) {
        self.setState({
          currentJourneyId: response.data._id,
          formSubmitted: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  getJourney = () => {
    const self = this;
    API.getJourney(this.state.currentJourneyId).then(function(response) {
      const currentJourneyData = response.data;
      self.setState({
        dataReceived: true,
        ...currentJourneyData,
        currentJourneyData
      });
    });
  };
  getCoord = childState => {
    const data = { ...childState };

    this.setState({ clickedLatLng: data });
  };

  conditionalRender = () => {
    if (
      this.state.formSubmitted === false &&
      _.isEmpty(this.state.currentJourneyData)
    ) {
      return (
        <JourneyForm
          onSubmit={childState => {
            this.journeyFormSubmit(childState);
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
              {this.state.dataReceived ? (
                <EventForm
                  key={`${this.state.clickedLatLng.lat}-${this.state.clickedLatLng.lng}`}
                  defaultLatLng={this.state.clickedLatLng}
                  allShips={this.state.currentJourneyData.ships}
                  onSubmit={childState => {
                    this.eventFormSubmit(childState);
                  }}
                />
              ) : (
                <div>please create the journey you wish to add events to</div>
              )}
            </div>
          </div>
          <div className="tile is-8 is-parent">
            <div className="tile is-child card">
              <Map
                onClick={childState => {
                  this.getCoord(childState);
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreateJourney;
