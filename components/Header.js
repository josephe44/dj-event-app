import React from "react";
import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <span>DJ Events</span>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/events">
              <span>Events</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
