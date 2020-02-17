import React, { Component } from "react";
import "./EventList.css";
import moment from "moment";

class EventList extends Component {
  state = {
    selectedShip: 0
  };

  handleTab = id => {
    this.setState({ selectedShip: id }, () => {
      this.props.onTabClick(this.state);
    });
  };

  handleEvent = id => {
    this.setState({ selectedEvent: id }, () => {
      this.props.onEventClick(this.state);
    });
    this.props.onEventClick(this.state);
  };

  handleNext = (id, direction) => {
    console.log(direction);
    this.setState({ selectedEvent: id }, () => {
      this.props.forward(this.state.selectedEvent, direction);
    });
  };

  render() {
    console.log(this.props.selectedEvent);
    const { ships, events } = this.props;

    return (
      <article className="panel is-primary">
        <div className="panel-heading">
          Events
          <div className="nav">
            <div
              className="nav-icon"
              onClick={() => this.handleNext(this.props.selectedEvent, "-")}
            >
              <i className=" is-large fas fa-arrow-left"></i>
            </div>
            <div
              className="nav-icon"
              onClick={() => this.handleNext(this.props.selectedEvent, "+")}
            >
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>

        <p className="panel-tabs">
          <a
            onClick={() => {
              this.handleTab(0);
            }}
            href="#0"
            className={this.state.selectedShip === 0 ? "is-active" : ""}
          >
            All
          </a>

          {ships.map((ship, i) => {
            return (
              <a
                className={
                  this.state.selectedShip === ship._id ? "is-active" : ""
                }
                key={i}
                onClick={() => {
                  this.handleTab(ship._id);
                }}
                href="#0"
              >
                {ship.name}
              </a>
            );
          })}
        </p>
        <div className="scrolls">
          {events.map((event, i) => {
            if (event._id === this.props.selectedEvent) {
              return (
                <a
                  onClick={() => {
                    this.handleEvent(event._id);
                  }}
                  href="#0"
                  key={i}
                  className="panel-block is-active currentEvent"
                >
                  {/* for adding icons before the events
                  <span className="panel-icon">
                    <i className="fas fa-book" aria-hidden="true"></i>
                  </span> */}
                  <b>{event.title}</b>
                  <div className="datebox is-pulled-right">
                    {moment(event.start_date).format("MMM Do YYYY")} -
                    {moment(event.end_date).format("MMM Do YYYY")}
                  </div>
                </a>
              );
            } else {
              return (
                <a
                  onClick={() => {
                    this.handleEvent(event._id);
                  }}
                  href="#0"
                  key={i}
                  className="panel-block is-active"
                >
                  {/* for adding icons before the events
                    <span className="panel-icon">
                      <i className="fas fa-book" aria-hidden="true"></i>
                    </span> */}
                  <b>{event.title}</b>
                  <div className="datebox is-pulled-right">
                    {moment(event.start_date).format("MMM Do YYYY")} -
                    {moment(event.end_date).format("MMM Do YYYY")}
                  </div>
                </a>
              );
            }
          })}
        </div>
      </article>
    );
  }
}

export default EventList;
