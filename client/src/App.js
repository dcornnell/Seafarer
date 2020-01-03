import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Journeys from "./pages/Journeys";
import Journey from "./pages/Journey";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Journeys} />
          <Route exact path="/journeys/:id" component={Journey} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
