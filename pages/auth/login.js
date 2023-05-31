import React, { useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Layout title="User Login">
      <h1>Login</h1>
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
