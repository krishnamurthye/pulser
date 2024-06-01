"use client";
import { useEffect, useState } from "react";
import NewSLARequest from "./lsa-new-popup";
import { buildUrl, lsaRoute } from "@/app/utils/api";
import { getAuthToken, getFormattedDate } from "@/app/utils/util-fn";
import { fetchLSARequests } from "@/app/apis/api-calls";

const LSARRequestsPage = () => {
  const [lsaRequests, setLSARequests] = useState([]);

  useEffect(() => {
    getLsaRequests();
  }, []);

  const getLsaRequests = async () => {
    const result: any = await fetchLSARequests();
    setLSARequests(result);
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
    getLsaRequests();
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
          {lsaRequests?.map((request: any) => (
            <tr key={request.id} onClick={handleRowClick}>
              <td className="border border-gray-400 px-4 py-2">
                {getFormattedDate(request.createdAt)}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {request.childDetails.firstName +
                  " " +
                  request.childDetails.lastName}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {request.age}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {request.grade}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {request.needs}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {getFormattedDate(request.start_date)}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {getFormattedDate(request.end_date)}
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
