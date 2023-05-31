import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import { toast } from "react-toastify";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("Please fill in all fields");
    }
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
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <input type="submit" value="Register" className="btn btn-secondary" />
      </form>
      <p>
        Already have an account? <a href="/auth/login">Login</a>
      </p>
    </Layout>
  );
}
