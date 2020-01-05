import React from "react";

import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        SeaFarers
        {/* <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> */}
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to={"/journeys/new"}>
            New Journey
          </Link>

          <Link className="navbar-item" to={"/"}>
            Journey List
          </Link>
        </div>
      </div>

      <div className="navbar-end"></div>
    </nav>
  );
}

export default Navbar;
