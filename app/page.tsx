import React from "react";
import Link from "next/link";
import Login from "./login/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      {/* <h3>Main Page</h3> */}
      <Login />
      {/* <div>
        <Link href="/login">Login</Link>
        <Link href="/registration">Register</Link>
      </div> */}
    </main>
  );
}
