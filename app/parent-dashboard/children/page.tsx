"use client";
import PersonIcon from "@/public/PersonIcon";
import AddChildPopup from "../child-new-popup";
import ChildContactCard from "../child-contact-card";
import ChildTable from "../child-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildUrl, parentRoute } from "@/app/utils/api";
import { fetchChildrenForParent } from "@/app/apis/api-calls";
import { getFormattedDate } from "@/app/utils/util-fn";

const Children = ({ gradeList, needLevelList, schoolsList }: any) => {
  const [children, setChildren] = useState([]);
  const [isAddChildPopupOpen, setIsAddChildPopupOpen] = useState(false);
  const [isEditChildPopupOpen, setIsEditChildPopupOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState();
  const router = useRouter();

  const username: any = localStorage.getItem("username");

  useEffect(() => {
    getChildren();
  }, [username]);

  const getChildren = async () => {
    const response: any = await fetchChildrenForParent();
    setChildren(response);
  };

  const handleEditChildClick = (child: any) => {
    setIsEditChildPopupOpen(true);
    setSelectedChild(child);
  };

  const handleCloseChildPopup = () => {
    setIsEditChildPopupOpen(false);
  };

  const handleAddChildClick = () => {
    setIsAddChildPopupOpen(true);
  };

  const handleClosePopup = async () => {
    setIsAddChildPopupOpen(false);
    await getChildren(); // Refresh the list after closing the popup
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <button
          className="bg-green-400 text-white py-2 px-4 rounded"
          onClick={handleAddChildClick}
        >
          New Child
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {children?.map((child: any) => (
          <div
            key={child.id}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer text-center hover:shadow-lg transition-shadow"
            onClick={() => handleEditChildClick(child)}
          >
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            </div>

            <div className="grid grid-cols-2 text-left gap-y-3">
              <p className="font-semibold text-gray-700">Name:</p>
              <p className="text-gray-600">
                {child.firstName + " " + child.lastName}
              </p>

              <p className="font-semibold text-gray-700">DOB:</p>
              <p className="text-gray-600">{getFormattedDate(child.dob)}</p>

              <p className="font-semibold text-gray-700">Grade:</p>
              <p className="text-gray-600">{child?.schooling[0]?.grade.name}</p>

              <p className="font-semibold text-gray-700">Level:</p>
              <p className="text-gray-600">{child?.schooling[0]?.needLevel.name}</p>

              <p className="font-semibold text-gray-700">Status:</p>
              <p className="text-gray-600" style={{color: child.isActive ? 'green' : 'red'}}>
                {child.isActive ? "Active" : "In-Active"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isAddChildPopupOpen && <AddChildPopup onClose={handleClosePopup} />}
      {isEditChildPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-screen-lg overflow-y-auto">
            <ChildContactCard child={selectedChild} />
            <ChildTable child={selectedChild} />
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
