import React from "react";
import moment from "moment";

function About({ name, start_date, end_date, description }) {
  return (
    <>
      <h3>{name}</h3>
      <h5>
        {moment(start_date).format("MMMM Do YYYY")} -
        {moment(end_date).format("MMMM Do YYYY")}
      </h5>
      <p>{description}</p>
    </>
  );
}

export default About;
