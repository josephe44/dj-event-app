import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/Event.module.css";

export default function SingleEventPage({ events }) {
  const router = useRouter();
  const deleteEvent = () => {};

  return (
    <Layout title="Single event page">
      {events.map((evt) => (
        <div key={evt.id} className={styles.event}>
          <div className={styles.controls}>
            <Link href={`/events/edit/${evt.id}`}>
              <span className={styles.edit}>
                <FaPencilAlt /> Edit Event
              </span>
            </Link>
            <span className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </span>
          </div>

          <p>
            {evt.date} at {evt.time}
          </p>

          <h1>{evt.name}</h1>

          {evt.image && (
            <div className={styles.image}>
              <Image src={evt.image} width={960} height={600} alt={evt.name} />
            </div>
          )}

          <h3>Performers:</h3>
          <p>{evt.performers}</p>
          <h3>Description:</h3>
          <p>{evt.description}</p>
          <h3>Venue: {evt.venue}</h3>
          <p>{evt.address}</p>
        </div>
      ))}

      <button className="btn" onClick={() => router.push("/events")}>
        {"<"} Go Back
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
