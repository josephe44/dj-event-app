import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import axios from "axios";
import { API_URL } from "@/config/index";
const PER_PAGE = 2;

export default function EventPage({ events, total, pageSize, page }) {
  return (
    <Layout>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {/* pagination */}
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`} aria-disabled>
          <span className="btn-secondary">Prev</span>
        </Link>
      )}

      {total > page && (
        <Link href={`/events?page=${page + 1}`}>
          <span className="btn-secondary">Next</span>
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const number = +page;
  try {
    const res = await axios.get(
      `${API_URL}/api/events/?pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}&populate=*`
    );

    return {
      props: {
        events: res?.data?.data,
        total: res?.data?.meta?.pagination?.total,
        pageSize: res?.data?.meta?.pagination?.pageSize,
        page: number,
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
