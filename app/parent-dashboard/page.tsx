"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Children from "./children/page";
import LSARRequestsPage from "./LSA-requests/page";
import Billing from "./billing/page";
import Messages from "./messages/page";
import { fetchChildrenForParent } from "../apis/api-calls";
import { toast } from "react-toastify";

const ParentDashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState("Children");
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeList, setGradeList] = useState([]);
  const [needLevelList, setNeedLevelList] = useState([]);
  const [schoolsList, setSchoolsList] = useState([]);

  const router = useRouter();
  const handleNavItemClick = (item: any) => {
    setActiveNavItem(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username: any = localStorage.getItem("username");
        const token: any = localStorage.getItem("authToken");
        const encodedUsername = encodeURIComponent(username);
        const response = await fetchChildrenForParent();

        if (response?.length) {
          // const result = await response.json();
          // setGradeList(result.gradeList);
          // setNeedLevelList(result.needLevelList);
          // setSchoolsList(result.schoolsList);
          // Handle any follow-up tasks
        } else {
          throw new Error("Failed to fetch child data");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch child data :" + error?.message, {
          position: "top-right",
          className: "custom-toast",
        });
      }
    };

    // fetchData();
  }, []);

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
                  ? "bg-green-400 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => handleNavItemClick("Children")}
            >
              Children
            </li>
            <li
              className={`cursor-pointer py-2 px-4 ${
                activeNavItem === "LSA Requests"
                  ? "bg-green-400 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => handleNavItemClick("LSA Requests")}
            >
              LSA Requests
            </li>
            {/* <li
              className={`cursor-pointer py-2 px-4 ${
                activeNavItem === "Billing"
                  ? "bg-green-400 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => handleNavItemClick("Billing")}
            >
              Billing
            </li> */}
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
          {activeNavItem === "Children" && (
            <Children
              gradeList={gradeList}
              needLevelList={needLevelList}
              schoolsList={schoolsList}
            />
          )}
          {activeNavItem === "LSA Requests" && <LSARRequestsPage />}
          {activeNavItem === "Billing" && <Billing />}
          {activeNavItem === "Messages" && <Messages />}
          {/* Placeholder content for other nav items */}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;