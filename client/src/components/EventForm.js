import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class EventForm extends Component {
  state = {
    description: "",
    start_date: "",
    end_date: "",
    lat: "",
    lng: "",
    formSubmitted: false
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    const location = {
      coordinates: [this.state.lng, this.state.lat],
      type: "Point"
    };
    console.log(this.state);
    axios
      .post("/events/create", {
        description: this.state.description,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        location: location
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    if (this.state.formSubmitted) {
      return <Redirect to="/" />;
    } else {
      return (
        <form className="form">
          <input
            value={this.state.description}
            name="description"
            onChange={this.handleInputChange}
            type="text"
            placeholder="description"
          />

          <input
            value={this.state.lng}
            name="lng"
            onChange={this.handleInputChange}
            type="number"
            placeholder="lng"
          />

          <input
            value={this.state.lat}
            name="lat"
            onChange={this.handleInputChange}
            type="number"
            placeholder="lat"
          />

          <input
            value={this.state.start_date}
            name="start_date"
            onChange={this.handleInputChange}
            type="date"
            placeholder="start date"
          />

          <input
            value={this.state.end_date}
            name="end_date"
            onChange={this.handleInputChange}
            type="date"
            placeholder="end date"
          />
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      );
    }
  }
}

export default EventForm;
