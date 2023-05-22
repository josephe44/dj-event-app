import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import axios from "axios";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";

export default function SearchPage({ events }) {
  console.log(events);
  const router = useRouter();
  return (
    <Layout title="Search Result">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  try {
    const res = await axios.get(
      `${API_URL}/api/events?filters[name][$contains]=${term}&filters[performers][$contains]=${term}&populate=*`
    );

    return {
      props: {
        events: res?.data?.data,
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
