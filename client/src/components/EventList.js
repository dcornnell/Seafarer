import React from "react";
import "./EventList.css";

function EventList({ ships, events }) {
  return (
    <article className="pane is-primary">
      <p className="panel-heading">Events</p>
      <p className="panel-tabs">
        <a href="/#" className="is-active">
          All
        </a>
        {ships.map((ship, i) => {
          return <a key={i}>{ship.name}</a>;
        })}
      </p>
      <div className="scrolls">
        {events.map((event, i) => {
          return (
            <a href="/#" key={i} className="panel-block is-active">
              <span className="panel-icon">
                <i className="fas fa-book" aria-hidden="true"></i>
              </span>
              {event.description}
            </a>
          );
        })}
      </div>
    </article>
  );
}

export default EventList;
