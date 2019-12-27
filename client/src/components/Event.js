import React from "react";
import moment from "moment";

function Event({ start_date, end_date, description }) {
  return (
    <li>
      <b>{description}</b>
      {moment(start_date).format("MMMM Do YYYY")}-
      {moment(end_date).format("MMMM Do YYYY")}
    </li>
  );
}

export default Event;
