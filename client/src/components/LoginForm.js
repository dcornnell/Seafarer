import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../util/Auth";

class LoginForm extends Component {
  static contextType = UserContext;

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
    if (username && password) {
      Auth.logIn(username, password, response => {
        this.context.setUser(response);
        this.props.history.push("/");
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <h1 className="title is-5">Login</h1>
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
          <strong>Login</strong>
        </button>
      </form>
    );
  }
}

export default withRouter(LoginForm);
