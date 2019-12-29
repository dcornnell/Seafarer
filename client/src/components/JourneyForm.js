import React from "react";
import axios from "axios";
class JourneyForm extends React.Component {
  state = {
    ships: ["SOMETHING"],
    name: "",
    description: "",
    start_date: "",
    end_date: ""
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
      .post("/journeys/create", {
        name: this.state.name,
        description: this.state.description,
        start_date: this.state.start_date,
        end_date: this.state.end_date
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({
      ships: [],
      name: "",
      description: "",
      start_date: "",
      end_date: ""
    });
  };

  render() {
    return (
      <form className="form">
        <input
          value={this.state.name}
          name="name"
          onChange={this.handleInputChange}
          type="text"
          placeholder="name"
        />
        <input
          value={this.state.description}
          name="description"
          onChange={this.handleInputChange}
          type="text"
          placeholder="description"
        />
        <input
          value={this.state.start_date}
          name="start_date"
          onChange={this.handleInputChange}
          type="date"
          placeholder="start_date"
        />
        <input
          value={this.state.end_date}
          name="end_date"
          onChange={this.handleInputChange}
          type="date"
          placeholder="end_date"
        />
        <button onClick={this.handleFormSubmit}>Sumbit</button>
      </form>
    );
  }
}

export default JourneyForm;
