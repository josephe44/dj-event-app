import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function EventPage({ events }) {
  return (
    <Layout>
      {/* {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))} */}
    </Layout>
  );
}

// export async function getStaticProps() {
//   const res = await fetch(`${API_URL}/api/events`);
//   const events = await res.json();

//   return {
//     props: { events },
//     revalidate: 1,
//   };
// }
