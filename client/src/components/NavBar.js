import React from "react";
import { TopBar, TopBarLeft, TopBarRight } from "react-foundation";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <TopBar>
      <TopBarLeft>Seafarer</TopBarLeft>
      <TopBarRight>
        <Link to={"/journeys/new"}>New Journey</Link>|
        <Link to={"/"}>Journey List</Link>
      </TopBarRight>
    </TopBar>
  );
}

export default Navbar;
