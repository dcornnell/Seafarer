import React from "react";

import { Link } from "react-router-dom";
function Nav({ loggedIn }) {
  console.log(loggedIn);
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">SeaFarers</div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to={"/"}>
            Journey List
          </Link>
          {loggedIn ? (
            <Link className="navbar-item" to={"/journeys/new"}>
              New Journey
            </Link>
          ) : (
            " "
          )}
        </div>
      </div>

      <div className="navbar-end">
        {loggedIn ? (
          ""
        ) : (
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-primary" to={"/signup"}>
                <strong>Sign up</strong>
              </Link>
              <Link className="button is-light" to={"/login"}>
                <strong>Log in</strong>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
