import React, { Component } from "react";
import JourneyForm from "../components/JourneyForm";
import EventForm from "../components/EventForm";
import Map from "../components/Map";

import API from "../util/API";
import About from "../components/About";
import _ from "lodash";
import Event from "../components/Event";
import EventList from "../components/EventList";
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
    const shipIds = childState.selectedShips;
    console.log(shipIds);
    API.createEvent(childState, shipIds)
      .then(response => {
        this.getJourney();
      })
      .catch(error => {
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

  componentDidMount() {
    if (_.isEmpty(this.state.currentJourneyData) === false) {
      this.getJourney();
    }
  }
  getJourney = () => {
    console.log("is this going");
    API.getJourney(this.state.currentJourneyId).then(response => {
      const currentJourneyData = response.data;
      this.setState({
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

  filterEvents = () => {
    let events = [];
    for (let i = 0; i < this.state.currentJourneyData.ships.length; i++) {
      for (
        let j = 0;
        j < this.state.currentJourneyData.ships[i].events.length;
        j++
      ) {
        events.push(this.state.currentJourneyData.ships[i].events[j]);
      }
    }
    return events;
  };

  render() {
    console.log(this.state.currentJourneyData.ships);
    return (
      <>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical">
            <div className="tile is-child card is-primary">
              {this.conditionalRender()}
            </div>
            <div className="tile is-child card is-warning">
              {this.state.dataReceived ? (
                <>
                  <EventForm
                    defaultLatLng={this.state.clickedLatLng}
                    allShips={this.state.currentJourneyData.ships}
                    onSubmit={childState => {
                      this.eventFormSubmit(childState);
                    }}
                  />
                  <EventList>
                    {this.filterEvents().map((event, i) => {
                      return (
                        <Event
                          key={i}
                          start_date={event.start_date}
                          end_date={event.end_date}
                          description={event.description}
                        />
                      );
                    })}
                  </EventList>
                </>
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
