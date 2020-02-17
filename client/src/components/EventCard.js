import React from "react";
import moment from "moment";

function EventCard({ event }) {
  console.log(event);
  if (event.length > 0) {
    console.log(event[0]);
    return (
      <div className="box">
        <h1 className="title is-5">{event[0].title}</h1>
        <h1 className="subtitle is-6">
          {moment(event[0].start_date).format("MMM Do YYYY")} -
          {moment(event[0].end_date).format("MMM Do YYYY")}
        </h1>
        <p>{event[0].description}</p>
        <img src={event[0].img} />
      </div>
    );
  } else
    return <div className="box">click on an event to see more about it</div>;
}

export default EventCard;
