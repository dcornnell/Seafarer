import React, { Component } from "react";
import moment from "moment";
import Modal from "../components/Modal";
class EventCard extends Component {
  state = {
    modal: false
  };

  toggleModal = event => {
    event.preventDefault();
    this.setState({ modal: !this.state.modal });
  };

  checkEvent = event => {
    if (event.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return this.checkEvent(this.props.event) ? (
      <div className="box eventbox">
        {this.props.event[0].img ? (
          <>
            <figure className="image event-image">
              <img
                src={this.props.event[0].img}
                onClick={event => {
                  this.toggleModal(event);
                }}
              />
            </figure>
            <Modal
              status={this.state.modal}
              onClick={event => {
                this.toggleModal(event);
              }}
            >
              <img className="true" src={this.props.event[0].img} />
            </Modal>
          </>
        ) : (
          ""
        )}
        <h1 className="title is-5">{this.props.event[0].title}</h1>
        <h1 className="subtitle is-6">
          {moment(this.props.event[0].start_date).format("MMM Do YYYY")} -
          {moment(this.props.event[0].end_date).format("MMM Do YYYY")}
        </h1>
        <p>{this.props.event[0].description}</p>
      </div>
    ) : (
      <div className="box">click on an event to see more about it</div>
    );
  }
}

export default EventCard;
