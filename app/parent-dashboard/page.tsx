"use client";
import { useState } from "react";
import ChildEditPopup from "./child-new-popup";
import ChildContactCard from "./child-contact-card";
import ChildTable from "./child-table";
import PersonIcon from "@/public/PersonIcon";
import { useRouter } from "next/navigation";
import Children from "./children/page";
import LSARRequestsPage from "./LSA-requests/page";
import Billing from "./billing/page";
import Messages from "./messages/page";
import { useQuery, gql } from "@apollo/client";

const Dashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState("Children");
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const handleNavItemClick = (item: any) => {
    setActiveNavItem(item);
  };

  return (
    <div className="sm:px-6 lg:px-8 container mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="flex">
        {/* Side Navigation */}
        <div className="w-1/4 bg-gray-200 h-screen">
          <ul className="space-y-2">
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeNavItem === "Children"
                  ? "bg-blue-400 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => handleNavItemClick("Children")}
            >
              Children
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeNavItem === "LSA Requests"
                  ? "bg-blue-400 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => handleNavItemClick("LSA Requests")}
            >
              LSA Requests
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeNavItem === "Billing"
                  ? "bg-blue-400 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => handleNavItemClick("Billing")}
            >
              Billing
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeNavItem === "Messages"
                  ? "bg-blue-400 text-white"
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
          {activeNavItem === "Children" && <Children />}
          {activeNavItem === "LSA Requests" && <LSARRequestsPage />}
          {activeNavItem === "Billing" && <Billing />}
          {activeNavItem === "Messages" && <Messages />}
          {/* Placeholder content for other nav items */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
