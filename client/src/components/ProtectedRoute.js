import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../util/Auth";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isLoggedIn() ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default ProtectedRoute;
