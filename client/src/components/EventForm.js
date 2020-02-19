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
    valid_date: false,
    img: null
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
    this.setState({ img: null }, this.props.onSubmit(this.state));
  };
  // main logic for uploading image to cloudinary, the image is uploaded before they submit the form for the preview image to show up

  imageUpload = async event => {
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "jiztc5xj");
    this.setState({ loading: true });
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dcornnell/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    this.setState({ img: file.secure_url });
  };

  render() {
    return (
      <form className="form">
        <div className="form-group">
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">Title:</label>
                <input
                  className="input is-small"
                  value={this.state.title}
                  name="title"
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="title"
                />
              </div>
              <div className="field">
                <label className="label">Description</label>
                <textarea
                  className="textarea is-small"
                  value={this.state.description}
                  name="description"
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="description"
                />
              </div>
              <label className="label">Ships at this event</label>
              {this.props.allShips.map((ship, i) => {
                return (
                  <div key={i}>
                    {ship.name}:
                    <input
                      type="checkbox"
                      name={ship.name}
                      value={ship._id}
                      onChange={this.handleShipSelect}
                    />
                  </div>
                );
              })}
            </div>

            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="field is-inline-block-desktop">
                    <label className="label">Longitute</label>
                    <input
                      className="input is-small"
                      value={this.state.lng}
                      name="lng"
                      onChange={this.handleInputChange}
                      type="number"
                      placeholder="lng"
                    />
                  </div>
                  <div className="field is-inline-block-desktop">
                    <label className="label">Latitude</label>
                    <input
                      className="input is-small"
                      value={this.state.lat}
                      name="lat"
                      onChange={this.handleInputChange}
                      type="number"
                      placeholder="lng"
                    />
                  </div>
                  <div className="field is-inline-block-desktop">
                    <label className="label">Start Date</label>
                    <input
                      className="input is-small"
                      min={this.props.mindate}
                      value={this.state.start_date}
                      name="start_date"
                      onChange={this.handleInputChange}
                      type="date"
                      placeholder="start date"
                    />
                  </div>

                  <div className="field is-inline-block-desktop">
                    <label className="label">End Date</label>
                    <input
                      className="input is-small"
                      value={this.state.end_date}
                      name="end_date"
                      onChange={this.handleInputChange}
                      type="date"
                      placeholder="end date"
                    />
                  </div>
                  <p>{this.dateCheck()}</p>
                </div>

                <div className="column">
                  {this.state.img ? (
                    <img
                      className="preview"
                      src={this.state.img}
                      alt="preview"
                    />
                  ) : (
                    ""
                  )}
                  <div className="file">
                    <label className="file-label">
                      <input
                        className="file-input"
                        name="img"
                        type="file"
                        onChange={this.imageUpload}
                        ref={ref => (this.fileInput = ref)}
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">Upload Image</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="button is-large is-primary"
            onClick={event => {
              this.onSubmit(event);
            }}
          >
            Add Event!
          </button>
        </div>
      </form>
    );
  }
}

export default EventForm;
