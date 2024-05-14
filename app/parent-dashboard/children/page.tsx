"use client";
import PersonIcon from "@/public/PersonIcon";
import ChildEditPopup from "../child-new-popup";
import ChildContactCard from "../child-contact-card";
import ChildTable from "../child-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Children = ({ gradeList, needLevelList, schoolsList }: any) => {
  const [children, setChildren] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isChildPopupOpen, setIsChildPopupOpen] = useState(false);
  const router = useRouter();

  const token = localStorage.getItem("authToken");
  const username: any = localStorage.getItem("username");

  useEffect(() => {
    fetchChildren();
  }, [router, username]);

  const fetchChildren = async () => {
    let response: any;
    try {
      if (!token) {
        router.push("/login"); // Redirect to login if no token
        return;
      }

      const encodedUsername = encodeURIComponent(username);
      const response = await fetch(
        `http://localhost:4201/api/children/${encodedUsername}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setChildren(data); // Assuming the API returns the array of children directly
    } catch (error: any) {
      console.error("Failed to fetch children:", error);
      if (error.message === "Failed to fetch" || response.status === 401) {
        // Unauthorized access or network error
        router.push("/login");
      }
    }
  };

  const handleChildClick = () => {
    setIsChildPopupOpen(true);
  };

  const handleCloseChildPopup = () => {
    setIsChildPopupOpen(false);
  };

  const handleAddChildClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    fetchChildren(); // Refresh the list after closing the popup
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <button
          className="bg-green-400 text-white py-2 px-4 rounded"
          onClick={handleAddChildClick}
        >
          Add New
        </button>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search..."
          value={""}
          onChange={() => {}}
          className="border border-gray-400 rounded px-2 py-1"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {children.map((child: any) => (
          <div
            key={child.id}
            className="bg-gray-200 p-4 rounded-md cursor-pointer text-center"
            onClick={handleChildClick}
          >
            <PersonIcon />
            <div className="grid grid-cols-2 text-left gap-y-2">
              <p className="font-bold">Name:</p>
              <p>{child.firstname + " " + child.lastname}</p>

              <p className="font-bold">DOB:</p>
              <p>{child.dob}</p>

              <p className="font-bold">Grade:</p>
              <p>{child.grade}</p>

              <p className="font-bold">Level:</p>
              <p>{child.needLevel}</p>

              <p className="font-bold">Status:</p>
              <p>{child.isActive}</p>
            </div>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <ChildEditPopup
          onClose={handleClosePopup}
          gradeList={gradeList}
          needLevelList={needLevelList}
          schoolsList={schoolsList}
        />
      )}
      {isChildPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-screen-lg overflow-y-auto">
            <ChildContactCard />
            <ChildTable />
            <button
              onClick={handleCloseChildPopup}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Children;
