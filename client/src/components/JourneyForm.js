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
            {this.dateCheck()}
          </div>
          <button
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
