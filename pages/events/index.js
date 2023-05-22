import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import axios from "axios";
import { API_URL } from "@/config/index";

export default function EventPage({ events }) {
  return (
    <Layout>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await axios.get(`${API_URL}/api/events/?populate=*`);

    return {
      props: {
        events: res?.data?.data,
        revalidate: 1,
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
