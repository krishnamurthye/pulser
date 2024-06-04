"use client";

import { useEffect, useState } from "react";
import { fetchLSARequests } from "../apis/api-calls";

const LSAProjects = () => {
  // Sample data for the table, you can replace it with actual data from your application state

  const [lsaRequests, setLSARequests] = useState([]);

  useEffect(() => {
    getLsaRequests();
  }, []);

  const getLsaRequests = async () => {
    const result: any = await fetchLSARequests();
    setLSARequests(result);
  };

  const [children, setChildren] = useState([
    {
      id: 20,
      requestDate: "29/08/2023",
      school: "DAS",
      child: "James",
      age: 9,
      grade: "G4",
      need: "English Language",
      startDate: "29/08/2023",
      endDate: "30/06/2024",
      status: "Applied",
    },
  ]);
  // State to manage the visibility of the edit popup
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  // State to manage the edited child's status
  const [editedStatus, setEditedStatus] = useState("");
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const sortBy = (key: any) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedChildren = () => {
    const sortableChildren = [...lsaRequests];
    sortableChildren.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortableChildren;
  };

  const getSortIcon = (key: any) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    }
    return null;
  };

  const handleRowClick = (child: any) => {
    // You can do anything here: navigate, open a modal, etc.
    console.log("Row clicked", child);
    // For example, if you're using Next.js, you might want to navigate to a detail page:
    // router.push(`/child/${child.id}`);
  };

  return (
    <>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th
              onClick={() => sortBy("lsa")}
              className="border border-gray-400 px-4 py-2 cursor-pointer"
            >
              Request Date {getSortIcon("lsa")}
            </th>
            <th
              onClick={() => sortBy("school")}
              className="border border-gray-400 px-4 py-2 cursor-pointer"
            >
              School {getSortIcon("school")}
            </th>
            <th
              onClick={() => sortBy("grade")}
              className="border border-gray-400 px-4 py-2 cursor-pointer"
            >
              Child {getSortIcon("child")}
            </th>
            <th
              onClick={() => sortBy("grade")}
              className="border border-gray-400 px-4 py-2 cursor-pointer"
            >
              Age {getSortIcon("age")}
            </th>
            <th
              onClick={() => sortBy("grade")}
              className="border border-gray-400 px-4 py-2 cursor-pointer"
            >
              Grade {getSortIcon("grade")}
            </th>
            <th
              onClick={() => sortBy("need")}
              className="border border-gray-400 px-4 py-2 cursor-pointer"
            >
              Need {getSortIcon("need")}
            </th>
            <th
              onClick={() => sortBy("startDate")}
              className="border border-gray-400 px-4 py-2 cursor-pointer"
            >
              Start Date {getSortIcon("startDate")}
            </th>
            <th
              onClick={() => sortBy("endDate")}
              className="border border-gray-400 px-4 py-2 cursor-pointer"
            >
              End Date {getSortIcon("endDate")}
            </th>
            <th
              onClick={() => sortBy("status")}
              className="border border-gray-400 px-4 py-2 cursor-pointer"
            >
              Status {getSortIcon("status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedChildren().map((child) => (
            <tr
              key={child.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(child)}
            >
              <td className="border border-gray-400 px-4 py-2">
                {child.requestDate}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {child.school}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {child.child}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {child.grade}
              </td>
              <td className="border border-gray-400 px-4 py-2">{child.need}</td>
              <td className="border border-gray-400 px-4 py-2">
                {child.startDate}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {child.endDate}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {child.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default LSAProjects;
