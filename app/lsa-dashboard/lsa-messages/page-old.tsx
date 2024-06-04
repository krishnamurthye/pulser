import React, { useState } from "react";
import LSAMessagePopUp from "./lsa-messagege-popup";

const LSAMessages = () => {
  const [showNewMessagePopup, setShowNewMessagePopup] = useState(false);

  const handleNewMessage = () => {
    setShowNewMessagePopup(true);
  };

  const handleClosePopup = () => {
    setShowNewMessagePopup(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          className="bg-green-400 text-white py-2 px-4 rounded"
          onClick={handleNewMessage}
        >
          New Message
        </button>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Read</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">From/To</th>
            <th className="border border-gray-300 p-2">Subject</th>
            <th className="border border-gray-300 p-2">Message</th>
            <th className="border border-gray-300 p-2">Attachment</th>
          </tr>
        </thead>
        <tbody>
          {/* Render table rows with data */}
          <tr>
            <td className="border border-gray-300 p-2">In</td>
            <td className="border border-gray-300 p-2">Read</td>
            <td className="border border-gray-300 p-2">24/12/2023</td>
            <td className="border border-gray-300 p-2">Ms. Lopez</td>
            <td className="border border-gray-300 p-2">
              Upcoming home assignment
            </td>
            <td className="border border-gray-300 p-2">
              Attachment "sir James has the following...."
            </td>
            <td className="border border-gray-300 p-2">No</td>
          </tr>
          {/* Add more table rows with data */}
        </tbody>
      </table>
      {showNewMessagePopup && <LSAMessagePopUp onClose={handleClosePopup} />}
    </div>
  );
};

export default LSAMessages;
