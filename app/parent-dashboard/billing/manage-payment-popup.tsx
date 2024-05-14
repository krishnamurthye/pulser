"use client";
import React from "react";

const ManagePaymentPopup = ({ onClose }: any) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Manage Payment Method</h2>
        {/* First column */}
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Saved Payment Methods</h3>
          {/* List of saved payment methods */}
          <div className="flex flex-col  items-center justify-center mb-2 w-full">
            {/* Card logo */}
            <div className="flex items-center mb-2">
              <img src="/card.jpg" alt="Card Logo" className="w-25 h-18" />
            </div>

            {/* Card number */}
            <div className="flex items-center mb-2">
              <span>**** **** **** 1234</span>
            </div>

            {/* Expiry */}
            <div className="flex items-center mb-2">
              <span>Exp: 12/24</span>
            </div>

            {/* Default checkbox */}
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="default"
                className="form-checkbox h-5 w-5"
              />
              <label htmlFor="default" className="ml-2">
                Default
              </label>
            </div>

            {/* Edit/Delete buttons */}
            <div className="flex items-center mb-2">
              <button className="bg-green-400 text-white px-2 py-1 rounded mr-2">
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </div>

          {/* Add more saved payment methods */}
        </div>
        {/* Second column */}
        <div>
          <h3 className="text-md font-semibold mb-2">Add New Card</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Card type dropdown */}
            <select className="border rounded px-3 py-2">
              {/* Options for card type dropdown */}
            </select>
            {/* Card number input */}
            <input
              type="text"
              placeholder="Card Number"
              className="border rounded px-3 py-2"
            />
            {/* Card holder name input */}
            <input
              type="text"
              placeholder="Card Holder Name"
              className="border rounded px-3 py-2"
            />
            {/* Expiry month dropdown */}
            <select className="border rounded px-3 py-2">
              {/* Options for expiry month dropdown */}
            </select>
            {/* Expiry year dropdown */}
            <select className="border rounded px-3 py-2">
              {/* Options for expiry year dropdown */}
            </select>
            {/* CVV input */}
            <input
              type="text"
              placeholder="CVV"
              className="border rounded px-3 py-2"
            />
          </div>
          {/* Cancel and Save buttons */}
          <div className="flex justify-end">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="bg-green-400 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePaymentPopup;
