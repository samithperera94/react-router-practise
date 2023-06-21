import React from "react";
import {
  useParams,
  json,
  useLoaderData,
  useRouteLoaderData,
  redirect,
} from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  // const data = useLoaderData();
  const data = useRouteLoaderData("event-detail");
  return <EventItem event={data.event} />;
};

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const id = params.eventID;
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json({ message: "Could not fetch event details" }, { status: 500 });
  } else {
    return response;
  }
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
