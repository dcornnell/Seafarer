import React, { Component } from "react";
//import UserContext from "../context/UserContext";
import API from "../util/API";

class UserForm extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(username, password);
    if (username && password) {
      API.createUser(username, password);
    }
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <h1 className="title is-5">Create User</h1>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.changeHandler}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.changeHandler}
            />
          </div>
        </div>
        <button className="button is-primary" type="submit">
          <strong>Submit</strong>
        </button>
      </form>
    );
  }
}

export default UserForm;
