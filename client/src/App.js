import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Journey from "./pages/Journey";
import CreateJourney from "./pages/CreateJourney";
import Container from "./components/Container";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import UserContext from "./context/UserContext";
import SignUp from "./pages/SignUp";
import "./App.css";

class App extends Component {
  state = {
    user: null
  };

  setUser = user => {
    this.setState({ user });
  };
  render() {
    const { user } = this.state;
    const setUser = this.setUser;
    return (
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Router>
          <div>
            <Nav loggedIn={user ? true : false} />
            <Container>
              <Switch>
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
                <ProtectedRoute
                  exact
                  path="/journeys/new"
                  component={CreateJourney}
                />
                <Route exact path="/journeys/:id" component={Journey} />
              </Switch>
            </Container>
          </div>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
