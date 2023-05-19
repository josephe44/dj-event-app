import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default function SingleEventPage() {
  const router = useRouter();
  console.log(router);
  return (
    <Layout title="Single event page">
      <h1>Single Event</h1>
      {router.query.slug}
      <button onClick={() => router.push("/")}>Click Me</button>
    </Layout>
  );
}
