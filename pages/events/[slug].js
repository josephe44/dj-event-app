import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function SingleEventPage({ events }) {
  const router = useRouter();

  return (
    <Layout title="Single event page">
      <h1>Single Event</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <div key={evt.id}>
          <h1>{evt.name}</h1>
          <h3>{evt.performers}</h3>
          <p>{evt.description}</p>
          <p>{evt.address}</p>
          <p>{evt.date}</p>
          <p>{evt.time}</p>
        </div>
      ))}

      <button className="btn" onClick={() => router.push("/events")}>
        Go Back
      </button>
    </Layout>
  );
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   return {
//     props: {
//       events,
//     },
//   };
// }

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();
  return {
    props: {
      events,
    },
    revalidate: 1,
  };
}
