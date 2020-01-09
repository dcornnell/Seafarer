import React from "react";
import moment from "moment";

function About({ name, start_date, end_date, description }) {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content ">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="media-right">
        {moment(start_date).format("MMM Do YYYY")}-
        {moment(end_date).format("MMM Do YYYY")}
      </div>
    </article>
  );
}

export default About;
