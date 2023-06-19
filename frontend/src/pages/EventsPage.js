import React from "react";
import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
  { id: "e1", title: "Event 1", details: "test" },
  { id: "e2", title: "Event 2", details: "test" },
  { id: "e3", title: "Event 3", details: "test" },
];

const EventsPage = () => {
  return (
    <>
      <h1>EventsPage</h1>
      <ul>
        {DUMMY_EVENTS.map((event) => {
          return (
            <li key={event.id}>
              <Link to={event.id} relative="path">
                {event.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default EventsPage;
