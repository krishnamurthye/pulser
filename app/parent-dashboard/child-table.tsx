"use client";

import { memo, useState } from "react";
import { getFormattedDate } from "../utils/util-fn";

const ChildTable = memo(({ child }: any) => {
  const [children, setChildren] = useState([child]);

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

  return (
    <>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
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
          </tr>
        </thead>
        <tbody>
          {sortedChildren().map((child) => (
            <tr key={child.id} onClick={handleRowClick}>
              <td className="border border-gray-400 px-4 py-2">
                {child?.lsaRequests[0]?.school}
              </td>

              <td className="border border-gray-400 px-4 py-2">
                {child?.schooling[0]?.grade}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {child?.lsaRequests[0]?.needs}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {getFormattedDate(child?.lsaRequests[0]?.start_date)}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {getFormattedDate(child?.lsaRequests[0]?.end_date)}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {child.state}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {child?.schooling[0]?.status}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {child.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
});

export default ChildTable;
