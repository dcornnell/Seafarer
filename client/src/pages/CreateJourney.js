import React, { Component } from "react";
import JourneyForm from "../components/JourneyForm";
import EventForm from "../components/EventForm";
import Map from "../components/Map";
import moment from "moment";
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
    clickedLatLng: {}
  };
  //
  eventFormSubmit(childState) {
    if (
      !moment(childState.start_date).isBetween(
        this.state.currentJourneyData.start_date,
        this.state.currentJourneyData.end_date
      )
    ) {
      return "your start date is outside the Journey!";
    } else if (
      !moment(childState.end_date).isBetween(
        this.state.currentJourneyData.start_date,
        this.state.currentJourneyData.end_date
      )
    ) {
      return "your end date is out the Journey";
    } else if (childState.start_date > childState.end_date) {
      return "your end date is before your start date";
    } else {
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
  }

  journeyFormSubmit(childState) {
    const { start_date, end_date } = childState;
    if (start_date <= end_date) {
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
  }

  componentDidMount() {
    if (_.isEmpty(this.state.currentJourneyData) === false) {
      this.getJourney();
    }
  }
  getJourney = () => {
    API.getJourney(this.state.currentJourneyId).then(response => {
      const currentJourneyData = response.data;
      this.setState({
        ships: currentJourneyData.ships,
        dataReceived: true,
        ...currentJourneyData,
        currentJourneyData
      });
    });
  };
  getCoord = childState => {
    const data = { ...childState };
    //this accounts for when people go to the "next" world
    data.lat = (((data.lat % 360) + 540) % 360) - 180;
    data.lng = (((data.lng % 360) + 540) % 360) - 180;

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
                    mindate={this.state.currentJourneyData.start_date}
                    maxdate={this.state.currentJourneyData.end_date}
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
              {this.state.dataReceived ? (
                <Map
                  mode="edit"
                  events={[...this.filterEvents()]}
                  onClick={childState => {
                    this.getCoord(childState);
                  }}
                />
              ) : (
                <Map
                  mode="edit"
                  onClick={childState => {
                    this.getCoord(childState);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreateJourney;
