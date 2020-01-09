import React, { Component } from "react";
import moment from "moment";

class EventForm extends Component {
  state = {
    description: "",
    start_date: "",
    end_date: "",
    lat: "",
    lng: "",
    title: "",
    formSubmitted: false,
    selectedShips: [],
    valid_date: false
  };

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      lat: props.defaultLatLng.lat,
      lng: props.defaultLatLng.lng
    };
  }

  dateCheck = () => {
    if (this.state.title.length > 30) {
      return "please enter a shorter title <30";
    }
    if (
      !moment(this.state.start_date).isBetween(
        this.props.mindate,
        this.props.enddate
      )
    ) {
      return "your start date is outside the Journey!";
    } else if (
      !moment(this.state.end_date).isBetween(
        this.props.mindate,
        this.props.enddate
      )
    ) {
      return "your end date is out the Journey";
    } else if (this.state.start_date > this.state.end_date) {
      return "your end date is before your start date";
    } else return "";
  };

  handleShipSelect = event => {
    let shipList = this.state.selectedShips;
    let check = event.target.checked;
    let checkedShip = event.target.value;
    if (check) {
      this.setState({
        selectedShips: [...this.state.selectedShips, checkedShip]
      });
    } else {
      const index = shipList.indexOf(checkedShip);
      shipList.splice(index, 1);
      this.setState({
        selectedShips: shipList
      });
    }
  };
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <form className="form">
        {this.props.allShips.map((ship, i) => {
          return (
            <div key={i}>
              {ship.name}
              <input
                type="checkbox"
                name={ship.name}
                value={ship._id}
                onChange={this.handleShipSelect}
              />
            </div>
          );
        })}

        <input
          value={this.state.title}
          name="title"
          onChange={this.handleInputChange}
          type="text"
          placeholder="title"
        />
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
          placeholder="lng"
        />

        <input
          min={this.props.mindate}
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

        <div>{this.dateCheck()}</div>

        <button
          onClick={event => {
            this.onSubmit(event);
          }}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default EventForm;
