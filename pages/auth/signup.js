import React from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Layout title="User Signup">
      <h1>Sign Up</h1>
      <form className={styles.form}>
        <div>
          <label htmlFor="name">Name</label>
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
