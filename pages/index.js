import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import axios from "axios";
import { API_URL } from "@/config/index";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <span className="btn-secondary">View All Events</span>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await axios.get(`${API_URL}/api/events/?populate=*`);

    return {
      props: {
        events: res?.data?.data.slice(0, 2),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        events: [],
      },
    };
  }
}
