"use client";
import { useEffect, useState } from "react";
import NewSLARequest from "./lsa-new-popup";
import { buildUrl, lsaRoute } from "@/app/utils/api";
import { getAuthToken } from "@/app/utils/util-fn";

const LSARRequestsPage = () => {
  const [lsaRequests, setLSARequests] = useState([]);
  // const [requests, setRequests] = useState([
  //   {
  //     id: "10",
  //     requestDate: "01/02/2023",
  //     childName: "James P",
  //     age: "9",
  //     grade: "G4",
  //     need: "English Language Asst",
  //     startDate: "01/02/2023",
  //     endDate: "01/02/2024",
  //     state: "Inactive",
  //     status: "Completed",
  //   },
  //   {
  //     id: "11",
  //     requestDate: "01/02/2023",
  //     childName: "John P",
  //     age: "12",
  //     grade: "G7",
  //     need: "Speech Delay Asst",
  //     startDate: "01/02/2023",
  //     endDate: "01/02/2024",
  //     state: "Active",
  //     status: "Open",
  //   },
  // ]);

  useEffect(() => {
    fetchLSARequests();
  }, []);

  const fetchLSARequests = async () => {
    const response = await fetch(buildUrl(lsaRoute, "/list"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log("lsa requests response =====> ", result);

      setLSARequests(result);
    }
  };

  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  // Handler for adding new request
  const handleAddRequest = () => {
    setShowNewRequestModal(true);
  };

  const handleClosePopup = () => {
    setShowNewRequestModal(false);
  };

  // Handler for searching requests
  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
    // Logic for filtering requests based on search query
  };

  const handleRowClick = (child: any) => {
    console.log("row clicked =====> ", child);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        {/* Add New Request button */}
        <button
          className="bg-green-400 text-white py-2 px-4 rounded"
          onClick={handleAddRequest}
        >
          Add New Request
        </button>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-400 rounded px-2 py-1"
        />
      </div>
      {/* Table of LSAR requests */}
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Request Date</th>
            <th className="border border-gray-400 px-4 py-2">Child Name</th>
            <th className="border border-gray-400 px-4 py-2">Age</th>
            <th className="border border-gray-400 px-4 py-2">Grade</th>
            <th className="border border-gray-400 px-4 py-2">Need</th>
            <th className="border border-gray-400 px-4 py-2">Start Date</th>
            <th className="border border-gray-400 px-4 py-2">End Date</th>
            <th className="border border-gray-400 px-4 py-2">State</th>
            <th className="border border-gray-400 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {lsaRequests?.map((request) => (
            <tr key={request.id} onClick={handleRowClick}>
              <td className="border border-gray-400 px-4 py-2">
                {request.requestDate}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {request.childName}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {request.age}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {request.grade}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {request.need}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {request.startDate}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {request.endDate}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {request.state}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {request.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showNewRequestModal && <NewSLARequest onClose={handleClosePopup} />}
    </div>
  );
};

export default LSARRequestsPage;
