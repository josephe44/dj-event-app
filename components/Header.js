import React, { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import Search from "./Search";
import styles from "@/styles/Header.module.css";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <span>DJ Events</span>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">
              <span>Events</span>
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link href="/events/add">
                  <span>Add Event</span>
                </Link>
              </li>

              <li>
                <Link href="/auth/dashboard">
                  <span>Dashboard</span>
                </Link>
              </li>

              <li>
                <button className="btn-secondary btn-icon" onClick={logout}>
                  <span className="btn-icon">
                    <FaSignOutAlt />
                    Logout
                  </span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/login" className="btn-icon btn-secondary">
                  <span className="btn-icon">
                    <FaSignInAlt />
                    Login
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
