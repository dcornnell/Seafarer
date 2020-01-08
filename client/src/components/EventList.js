import React, { Component } from "react";
import "./EventList.css";
import moment from "moment";

class EventList extends Component {
  state = {
    selectedShip: 0
  };
  handleTab = id => {
    this.setState({ selectedShip: id });
    this.props.onTabClick(this.state);
  };

  handleEvent = id => {
    this.setState({ selectedEvent: id });
    this.props.onEventClick(this.state);
  };

  render() {
    const { ships, events } = this.props;

    return (
      <article className="pane is-primary">
        <p className="panel-heading">Events</p>
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
            return (
              <a
                onClick={() => {
                  this.handleEvent(event._id);
                }}
                href="#0"
                key={i}
                className="panel-block is-active"
              >
                <span className="panel-icon">
                  <i className="fas fa-book" aria-hidden="true"></i>
                </span>
                <b>{event.title}</b>
                <div className="datebox is-pulled-right">
                  {moment(event.start_date).format("MMM Do YYYY")} -
                  {moment(event.end_date).format("MMM Do YYYY")}
                </div>
              </a>
            );
          })}
        </div>
      </article>
    );
  }
}

export default EventList;
