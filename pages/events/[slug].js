import React from "react";
import { useRouter } from "next/router";

export default function SingleEventPage() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <h1>Single Event</h1>
      {router.query.slug}
      <button onClick={() => router.push("/")}>Click Me</button>
    </div>
  );
}
