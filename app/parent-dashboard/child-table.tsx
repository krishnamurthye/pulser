"use client";

import { useState } from "react";

const ChildTable = () => {
  // Sample data for the table, you can replace it with actual data from your application state

  const [children, setChildren] = useState([
    {
      id: 1,
      lsa: "LSA",
      school: "DAS",
      grade: "G4",
      need: "English Language",
      startDate: "29/08/2023",
      endDate: "30/06/2024",
      state: "Active",
      status: "In Progress",
      rating: "4.5",
    },
  ]);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedChild, setSelectedChild] = useState(null);
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
    const sortableChildren = [...children];
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

  const handleRowClick = () => {};
  // const handleEditClick = (childId: any, event: any) => {
  //   // Show the edit popup and initialize the edited status with the current status
  //   setEditPopupVisible(true);
  //   const child = children.find((child) => child.id === childId);
  //   setEditedStatus(child?.status);

  //   const rect = event.target.getBoundingClientRect();
  //   setButtonPosition({
  //     top: rect.top + window.scrollY,
  //     left: rect.left + window.scrollX,
  //   });
  // };

  const handleEditClick = (child: any, event: any) => {
    const element = event.currentTarget; // The clicked table row element
    const rect = element.getBoundingClientRect(); // Get position relative to viewport
    // Set position for the popup (you may need to adjust the values to fit your needs)
    setPopupPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY + rect.height, // Adjust as needed
    });
    setSelectedChild(child); // Set the selected child state
    setEditPopupVisible(true); // Show the popup
  };

  // This function will be called to close the popup
  const handleClosePopup = () => {
    setEditPopupVisible(false);
  };

  const handleStatusChange = (event: any) => {
    // Update the edited status when the user selects a new status from the dropdown
    setEditedStatus(event.target.value);
  };

  const handleSave = (editedChildId: any) => {
    const updatedChildren = children?.map((child) => {
      if (child.id === editedChildId) {
        return { ...child, status: editedStatus };
      }
      return child;
    });

    setChildren(updatedChildren);
    setEditPopupVisible(false);
    setEditedStatus(editedStatus);
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
              LSA {getSortIcon("lsa")}
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
              onClick={() => sortBy("state")}
              className="border border-gray-400 px-4 py-2 cursor-pointer"
            >
              State {getSortIcon("state")}
            </th>
            <th
              onClick={() => sortBy("status")}
              className="border border-gray-400 px-4 py-2 cursor-pointer"
            >
              Status {getSortIcon("status")}
            </th>
            <th
              onClick={() => sortBy("rating")}
              className="border border-gray-400 px-4 py-2 cursor-pointer"
            >
              Rating {getSortIcon("rating")}
            </th>
            <th className="border border-gray-400 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedChildren().map((child) => (
            <tr key={child.id} onClick={handleRowClick}>
              <td className="border border-gray-400 px-4 py-2">{child.lsa}</td>
              <td className="border border-gray-400 px-4 py-2">
                {child.school}
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
                {child.state}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {child.status}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {child.rating}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <button onClick={(event) => handleEditClick(child, event)}>
                  Edit
                </button>
              </td>
              {editPopupVisible && (
                <div
                  className="absolute z-10 p-4 bg-white shadow-lg rounded"
                  style={{
                    top: `${popupPosition.y}px`,
                    left: `${popupPosition.x}px`,
                  }}
                >
                  {/* Dropdown to select status */}
                  <select
                    value={editedStatus}
                    onChange={handleStatusChange}
                    className="select select-secondary w-full max-w-xs"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    {/* Add more status options as needed */}
                  </select>
                  {/* Save button */}
                  <button onClick={handleSave}>Save</button>
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ChildTable;
