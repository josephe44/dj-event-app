import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import axios from "axios";
import styles from "@/styles/Event.module.css";
import dayjs from "dayjs";

export default function SingleEventPage({ events }) {
  const router = useRouter();
  const deleteEvent = () => {};
  console.log(events);

  return (
    <Layout title="Single event page">
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${events?.id}`}>
            <span className={styles.edit}>
              <FaPencilAlt /> Edit Event
            </span>
          </Link>
          <span className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </span>
        </div>

        <p>
          {dayjs(events?.attributes?.date).format("dddd, MMMM D, YYYY")} at{" "}
          {events?.attributes?.time}
        </p>

        <h1>{events?.attributes?.name}</h1>

        {events?.attributes?.image && (
          <div className={styles.image}>
            <Image
              src={
                events?.attributes?.image?.data?.attributes?.formats?.medium
                  ?.url
              }
              width={960}
              height={600}
              alt={events?.attributes?.name}
              priority="high"
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{events?.attributes?.performers}</p>
        <h3>Description:</h3>
        <p>{events?.attributes?.description}</p>
        <h3>Venue: {events?.venue}</h3>
        <p>{events?.attributes?.address}</p>
      </div>

      <button className="btn" onClick={() => router.push("/events")}>
        {"<"} Go Back
      </button>
    </Layout>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  try {
    const res = await axios.get(`${API_URL}/api/events/${slug}?populate=*`);

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
