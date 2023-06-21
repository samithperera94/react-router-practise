import { useLoaderData, json } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;
  if (data.isError) {
    return <p>{data.message}</p>;
  }
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export const loader = async () => {
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
    return response;
  }
};
