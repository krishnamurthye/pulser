import React from "react";
import Link from "next/link";
import { ApolloProvider } from "@apollo/client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h3>Main Page</h3>
      <div>
        <Link href="/login">Login</Link>
        <Link href="/registration">Register</Link>
      </div>
    </main>
  );
}
