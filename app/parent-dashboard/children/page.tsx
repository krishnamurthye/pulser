"use client";
import PersonIcon from "@/public/PersonIcon";
import ChildEditPopup from "../child-new-popup";
import ChildContactCard from "../child-contact-card";
import ChildTable from "../child-table";
import { useState } from "react";

const Children = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isChildPopupOpen, setIsChildPopupOpen] = useState(false);

  const data = {
    children: [
      {
        id: "1",
        name: "Child1",
        email: "one@pulsar.com",
        phoneNumber: "1234567890",
        dob: "asas",
        grade: "asd",
        needLevel: "asd",
        status: "asd",
      },
    ],
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
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-400 text-white py-2 px-4 rounded"
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
        {data.children.map((child) => (
          <div
            key={child.id}
            className="bg-gray-200 p-4 rounded-md cursor-pointer text-center"
            onClick={handleChildClick}
          >
            <PersonIcon />
            <div className="grid grid-cols-2 text-left gap-y-2">
              <p className="font-bold">Name:</p>
              <p>{child.name}</p>

              <p className="font-bold">DOB:</p>
              <p>{child.dob}</p>

              <p className="font-bold">Grade:</p>
              <p>{child.grade}</p>

              <p className="font-bold">Level:</p>
              <p>{child.needLevel}</p>

              <p className="font-bold">Status:</p>
              <p>{child.status}</p>
            </div>
          </div>
        ))}
      </div>
      {isPopupOpen && <ChildEditPopup onClose={handleClosePopup} />}
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
