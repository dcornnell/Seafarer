import React from "react";
import moment from "moment";

function EventListItem({ start_date, end_date, title }) {
  return (
    <li>
      <b>{title} </b>
      {moment(start_date).format("MMMM Do YYYY")}-
      {moment(end_date).format("MMMM Do YYYY")}
    </li>
  );
}

export default EventListItem;
