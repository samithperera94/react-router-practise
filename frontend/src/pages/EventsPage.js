import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  // const data = useLoaderData();
  // const events = data.events;

  const { events } = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  return (
    // <>
    //   <EventsList events={events} />
    // </>
    <Suspense fallback={<p className={{ textAlign: "center" }}>Loading ...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

const loadeEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return{isError:true,message:'could not fetch events'}
    // throw new Response(JSON.stringify({ message: "Could not fetch" }), {
    //   status: 500,
    // });
    json(
      { message: "Could not fetch" },
      {
        status: 500,
      }
    );
  } else {
    // const resData = await response.json();
    // return resData.events;
    // return response;
    const resData = await response.json();
    return resData.events;
  }
};

export const loader = () => {
  return defer({
    events: loadeEvents(),
  });
};
