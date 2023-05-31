import React, { useState, useContext } from "react";
import { FaUser } from "react-icons/fa";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import { toast } from "react-toastify";
import AuthContext from "@/context/AuthContext";

export default function Login() {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title="User Login">
      <div className="center">
        <FaUser size={36} />
        <h1>Login</h1>
      </div>
      <form className={styles.form} onSubmit={onHandleSubmit}>
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
        <input type="submit" value="Login" className="btn btn-secondary" />
      </form>
      <p>
        Don&apos;t have an account? <a href="/auth/signup">Sign Up</a>
      </p>
    </Layout>
  );
}
