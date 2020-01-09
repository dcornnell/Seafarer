import React from "react";
import Modal from "./Modal";
import API from "../util/API";
import ShipForm from "../components/ShipForm";

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

  getShips = () => {
    API.getShips().then(res => {
      this.setState({ allShips: res.data });
    });
  };

  toggleModal = event => {
    event.preventDefault();
    this.setState({ modal: !this.state.modal });
  };

  handleSelectShip = option => {
    const ship = JSON.parse(option.target.value);

    let selectedShips = this.state.selectedShips;
    if (!selectedShips.includes(ship)) {
      selectedShips.push(ship);
    }
    this.setState({ selectedShips: selectedShips });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  dateCheck = () => {
    if (this.state.end_date < this.state.start_date) {
      return "your start date is after your end date!";
    }
  };
  removeShip = id => {
    const selectedShips = this.state.selectedShips.filter(
      ship => ship._id !== id
    );
    this.setState({ selectedShips: selectedShips });
  };

  render() {
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
            <div className="buttons">
              {this.state.selectedShips.map(ship => {
                return (
                  <div
                    onClick={event => {
                      this.removeShip(ship._id);
                    }}
                    className="button is-success is-small"
                    key={ship._id}
                  >
                    {ship.name}
                  </div>
                );
              })}
            </div>
            <p>select a ship:</p>
            <div className="select">
              <select value={this.state.ships} onChange={this.handleSelectShip}>
                <option value="none" selected disabled hidden>
                  Select an Ship
                </option>
                {this.state.allShips.map(ship => {
                  return (
                    <option key={ship._id} value={JSON.stringify(ship)}>
                      {ship.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="button is-primary" onClick={this.toggleModal}>
              add new ship
            </button>
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
          <div className="field">
            <input
              className="input"
              value={this.state.start_date}
              name="start_date"
              onChange={this.handleInputChange}
              type="date"
              placeholder="start_date"
            />

            <input
              className="input"
              value={this.state.end_date}
              name="end_date"
              onChange={this.handleInputChange}
              type="date"
              placeholder="end_date"
            />
            {this.dateCheck()}
          </div>
          <button
            className="button is-primary"
            onClick={event => {
              this.onSubmit(event);
            }}
          >
            Submit
          </button>
        </form>
        <Modal
          status={this.state.modal}
          onClick={event => {
            this.toggleModal(event);
          }}
        >
          <ShipForm onSubmit={this.getShips} />
        </Modal>
      </>
    );
  }
}

export default JourneyForm;
