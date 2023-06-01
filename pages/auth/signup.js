import React, { useState, useContext } from "react";
import { FaUser } from "react-icons/fa";
import Layout from "@/components/Layout";
import styles from "@/styles/Auth.module.css";
import { toast } from "react-toastify";
import AuthContext from "@/context/AuthContext";

export default function Signup() {
  const { register, error } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      return toast.error("Please fill in all fields");
    }
    const user = { username, email, password };
    register(user);
  };
  return (
    <Layout title="User Signup">
      <div className="center">
        <FaUser size={36} />
        <h1>Sign up</h1>
      </div>
      <form className={styles.form} onSubmit={onHandleSubmit}>
        <div>
          <label htmlFor="name">Usernname</label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Register" className="btn btn-secondary" />
        <p>
          Already have an account? <a href="/auth/login">Login</a>
        </p>
      </form>
    </Layout>
  );
}
