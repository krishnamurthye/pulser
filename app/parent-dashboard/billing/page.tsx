import React, { useState } from "react";
import ManagePaymentPopup from "./manage-payment-popup";

const Billing = () => {
  const [showManagePaymentPopup, setShowManagePaymentPopup] = useState(false);

  const handleManagePayment = () => {
    setShowManagePaymentPopup(true);
  };

  const handleClosePopup = () => {
    setShowManagePaymentPopup(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          className="text-sm font-bold bg-blue-400 text-white py-2 px-2 rounded-md"
          onClick={handleManagePayment}
        >
          Manage Payment Method
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
            <th className="border border-gray-300 p-2">Billing Date</th>
            <th className="border border-gray-300 p-2">Child</th>
            <th className="border border-gray-300 p-2">Age</th>
            <th className="border border-gray-300 p-2">Grade</th>
            <th className="border border-gray-300 p-2">LSA</th>
            <th className="border border-gray-300 p-2">Invoice Period</th>
            <th className="border border-gray-300 p-2">Billing Vehicle</th>
            <th className="border border-gray-300 p-2">Transaction</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Render table rows with data */}
          <tr>
            <td className="border border-gray-300 p-2">Billing Date 1</td>
            <td className="border border-gray-300 p-2">Child 1</td>
            <td className="border border-gray-300 p-2">Age 1</td>
            <td className="border border-gray-300 p-2">Grade 1</td>
            <td className="border border-gray-300 p-2">LSA 1</td>
            <td className="border border-gray-300 p-2">Invoice Period 1</td>
            <td className="border border-gray-300 p-2">Billing Vehicle 1</td>
            <td className="border border-gray-300 p-2">Transaction 1</td>
            <td className="border border-gray-300 p-2">Status 1</td>
          </tr>
          {/* Add more table rows with data */}
        </tbody>
      </table>
      {showManagePaymentPopup && (
        <ManagePaymentPopup onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Billing;
