import React, { Component } from "react";
import axios from "axios";

class ShipForm extends Component {
  state = {
    name: "",
    type: "",
    about: "",
    country: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);

    axios
      .post("/ships/create", {
        name: this.state.name,
        type: this.state.type,
        about: this.state.about,
        country: this.state.country
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({
      name: "",
      type: "",
      about: "",
      country: ""
    });
    this.props.onSubmit();
  };

  render() {
    return (
      <form className="form">
        Ship Name:
        <input
          value={this.state.name}
          name="name"
          onChange={this.handleInputChange}
          type="text"
          placeholder="name"
        />
        Type:
        <input
          value={this.state.type}
          name="type"
          onChange={this.handleInputChange}
          type="text"
          placeholder="type"
        />
        About:
        <input
          value={this.state.about}
          name="about"
          onChange={this.handleInputChange}
          type="text"
          placeholder="about"
        />
        Country of Origin:
        <input
          value={this.state.country}
          name="country"
          onChange={this.handleInputChange}
          type="text"
          placeholder="country"
        />
        <button onClick={this.handleFormSubmit}>Submit</button>
      </form>
    );
  }
}

export default ShipForm;
