"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LSAProfile from "./lsa-profile/page";
import LSAProjects from "./lsa-projects-table";
import LSAPayments from "../parent-dashboard/lsa-payments/page";
import LSAMessages from "./lsa-messages/page";

const LSADashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState("Profile");
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const handleNavItemClick = (item: any) => {
    setActiveNavItem(item);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">LSA Dashboard</h1>
      </div>

      <div className="flex">
        {/* Side Navigation */}
        <div className="w-1/4 bg-gray-200 h-screen">
          <ul className="space-y-2">
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeNavItem === "Profile"
                  ? "bg-green-400 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => handleNavItemClick("Profile")}
            >
              Profile
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeNavItem === "Projects"
                  ? "bg-green-400 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => handleNavItemClick("Projects")}
            >
              Projects
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeNavItem === "Payments"
                  ? "bg-green-400 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => handleNavItemClick("Payments")}
            >
              Payments
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeNavItem === "Messages"
                  ? "bg-green-400 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => handleNavItemClick("Messages")}
            >
              Messages
            </li>
          </ul>
        </div>
        {/* Main Content */}
        <div className="w-3/4 pl-4">
          {activeNavItem === "Profile" && <LSAProfile />}
          {activeNavItem === "Projects" && <LSAProjects />}
          {activeNavItem === "Payments" && <LSAPayments />}
          {activeNavItem === "Messages" && <LSAMessages />}
        </div>
      </div>
    </div>
  );
};

export default LSADashboard;
