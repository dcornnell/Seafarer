import React, { Component } from "react";
import JourneyForm from "../components/JourneyForm";
import EventForm from "../components/EventForm";
import Map from "../components/Map";
import moment from "moment";
import API from "../util/API";
import About from "../components/About";
import _ from "lodash";
import EventListItem from "../components/EventListItem";
import EditEventList from "../components/EditEventList";
class CreateJourney extends Component {
  state = {
    journeySubmited: false,
    allShips: [],
    name: "",
    description: "2å",
    start_date: "",
    end_date: "",
    selectedShips: [],
    modal: false,
    formSubmitted: false,
    dataReceived: false,
    currentJourneyId: "",
    currentJourneyData: {},
    clickedLatLng: {},
    eventcount: 0,
    events: []
  };
  //
  eventFormSubmit(childState) {
    console.log(childState);
    if (
      !moment(childState.start_date).isBetween(
        this.state.currentJourneyData.start_date,
        this.state.currentJourneyData.end_date
      )
    ) {
      return "your start date is outside the Journey!";
    } else if (childState.title.length > 30) {
      return "please enter a shorter title <30";
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
      console.log("am i sending the right data", shipIds);
      API.createEvent(childState, shipIds)
        .then(response => {
          console.log(response.data);
          this.setState({
            events: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  journeyFormSubmit(childState) {
    console.log(childState.selectedShips);

    if (
      childState.start_date <= childState.end_date &&
      childState.selectedShips.length > 0
    ) {
      let shipsIds = [];

      childState.selectedShips.map(ship => {
        shipsIds.push(ship._id);
        return null;
      });
      const data = { ...childState, ships: shipsIds };

      API.createJourney(data)
        .then(response => {
          console.log(this);
          this.setState({
            currentJourneyData: response.data,
            formSubmitted: true,
            ships: childState.selectedShips
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
  getJourney() {
    console.log(this.state.currentJourneyData);
    API.getJourney(this.state.currentJourneyData._id).then(function(response) {
      const currentJourneyData = response;
      console.log(response);
      this.setState({
        ships: currentJourneyData.ships
        //dataReceived: true,
        //...currentJourneyData,
        //currentJourneyData
      });
    });
  }
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
    } else if (_.isEmpty(this.state.currentJourneyData === false)) {
      return (
        <About
          name={this.state.currentJourneyData.name}
          description={this.state.currentJourneyData.description}
          start_date={this.state.currentJourneyData.start_date}
          end_date={this.state.currentJourneyData.end_date}
        />
      );
    }
  };

  filterEvents = () => {
    console.log(this.state.events);
    let events = [];
    if (!_.isEmpty(this.currentJourneyData)) {
      for (let i = 0; i < this.state.currentJourneyData.ships.length; i++) {
        for (
          let j = 0;
          j < this.state.currentJourneyData.ships[i].events.length;
          j++
        ) {
          events.push(this.state.currentJourneyData.ships[i].events[j]);
        }
      }
    }
    return events;
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical">
            <div className="tile is-child card is-primary">
              {this.conditionalRender()}
            </div>
            <div className="tile is-child card is-warning">
              {_.isEmpty(this.state.currentJourneyData) === false ? (
                <>
                  <EventForm
                    mindate={this.state.currentJourneyData.start_date}
                    maxdate={this.state.currentJourneyData.end_date}
                    defaultLatLng={this.state.clickedLatLng}
                    allShips={this.state.ships}
                    onSubmit={childState => {
                      this.eventFormSubmit(childState);
                    }}
                  />

                  <EditEventList>
                    {this.filterEvents().map((event, i) => {
                      return (
                        <EventListItem
                          key={i}
                          start_date={event.start_date}
                          end_date={event.end_date}
                          description={event.description}
                        />
                      );
                    })}
                  </EditEventList>
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
                  events={this.state.events}
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
