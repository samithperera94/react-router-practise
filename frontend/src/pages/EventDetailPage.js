import React, { Suspense } from "react";
import {
  useParams,
  json,
  useLoaderData,
  useRouteLoaderData,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
  // const data = useLoaderData();
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

const loadEvent = async (id) => {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json({ message: "Could not fetch event details" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
};
const loadeEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    json(
      { message: "Could not fetch" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export const loader = async ({ request, params }) => {
  const id = params.eventID;

  return defer({
    event: await loadEvent(id),
    events: loadeEvents(),
  });
};

export const action = async ({ request, params }) => {
  const eventId = params.eventID;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not fdelete event" }, { status: 500 });
  }
  return redirect("/events");
};
