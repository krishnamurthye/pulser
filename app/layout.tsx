"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { AUTH_TOKEN } from "./utils/constants";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Pulsar",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by looking for a token in localStorage
    const token = localStorage.getItem(AUTH_TOKEN);
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Assuming you're using localStorage to store the token
    localStorage.removeItem("authToken"); // Adjust this if your token is stored elsewhere, like cookies

    // Redirect to the login page or home page after logout
    router.push("/login"); // Adjust the path as necessary, e.g., to home page if that's more appropriate
  };

  // const isLoggedIn = () => {
  //   if (typeof window !== "undefined") {
  //     // Code to run in the browser
  //     const loggedIn = localStorage.getItem("AUTH_TOKEN") === "true";
  //     return loggedIn;
  //   }

  //   // return localStorage.getItem(AUTH_TOKEN);
  // };

  return (
    <html lang="en">
      <Head>
        <title>Pulsar</title>
      </Head>
      <body className={inter.className}>
        <header className="bg-green-400 shadow">
          <div className="sm:px-6 lg:px-8 container mx-auto">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <a href="/">
                  <img
                    className="h-20 w-auto"
                    src="/pulsar-logo.jpg"
                    alt="Pulsar Logo"
                  />
                </a>
              </div>
              <div className="flex items-center">
                {/* Navigation links */}
                <a
                  href="/registration"
                  className="text-white hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Signup
                </a>

                {!isLoggedIn ? (
                  <a
                    href="/login"
                    className="text-white hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </a>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={12000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ToastContainer />
        </header>
        <main>{children}</main>
        <footer className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Your Company Name. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
