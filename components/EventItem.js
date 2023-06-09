import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";
import dayjs from "dayjs";

export default function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt?.attributes?.image
              ? evt?.attributes?.image?.data?.attributes?.formats?.thumbnail
                  ?.url
              : "/images/event-default.png"
          }
          width={170}
          height={100}
          alt={evt.attributes.name}
          priority="high"
        />
      </div>
      <div className={styles.info}>
        <span>
          {dayjs(evt?.attributes?.date).format("dddd, MMMM D, YYYY")} at{" "}
          {evt?.attributes?.time}
        </span>
        <h3>{evt?.attributes?.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt?.attributes?.slug}`}>
          <span className="btn">Details</span>
        </Link>
      </div>
    </div>
  );
}
