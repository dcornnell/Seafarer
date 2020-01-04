import React from "react";
import axios from "axios";
import Modal from "./Modal";

import { Redirect } from "react-router-dom";

class JourneyForm extends React.Component {
  state = {
    allShips: [],
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    selectedShips: [],
    modal: false,
    formSubmitted: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    this.getShips();
  }

  getShips() {
    axios.get("/ships/all").then(res => {
      this.setState({ allShips: res.data });
    });
  }

  componentDidUpdate() {
    this.getShips();
  }
  toggleModal = event => {
    event.preventDefault();
    this.setState({ modal: !this.state.modal });
  };

  handleSelectShip = option => {
    const ship = JSON.parse(option.target.value);
    console.log(ship);
    let selectedShips = this.state.selectedShips;
    if (!selectedShips.includes(ship)) {
      selectedShips.push(ship);
    }
    this.setState({ selectedShips: selectedShips });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const shipIds = [];
    this.state.selectedShips.map(ship => {
      shipIds.push(ship._id);
      return null;
    });

    axios
      .post("/journeys/create", {
        name: this.state.name,
        description: this.state.description,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        ships: shipIds
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({
      selectedShips: [],
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      formSubmitted: true
    });
  };

  render() {
    if (this.state.formSubmitted) {
      return <Redirect to="/" />;
    } else {
      return (
        <>
          <form className="form">
            <div className="field">
              <label className="label is-small">Journeys Name</label>
              <input
                className="input is-small"
                value={this.state.name}
                name="name"
                onChange={this.handleInputChange}
                type="text"
                placeholder="name"
              />
            </div>
            <div className="field">
              <label className="label is-small">Ships on the Journey:</label>
              {this.state.selectedShips.map(ship => {
                return <p key={ship._id}>{ship.name}</p>;
              })}
              <button onClick={this.toggleModal}>add a ship</button>
              <select value={this.state.ships} onChange={this.handleSelectShip}>
                {this.state.allShips.map(ship => {
                  return (
                    <option key={ship._id} value={JSON.stringify(ship)}>
                      {ship.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="field">
              <label className="label is-small">Description:</label>
              <textarea
                className="textarea is-small"
                value={this.state.description}
                name="description"
                onChange={this.handleInputChange}
                type="text"
                placeholder="description"
              />
            </div>
            <label className="label is-small">Start Date - End Date</label>
            <div className="field is-grouped is-grouped-multiline">
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
            </div>
            <button onClick={this.handleFormSubmit}>Submit</button>
          </form>
          <Modal
            status={this.state.modal}
            onClick={event => {
              this.toggleModal(event);
            }}
          ></Modal>
        </>
      );
    }
  }
}

export default JourneyForm;
