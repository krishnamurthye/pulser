"use client";
import React, { useState } from "react";

const NewSLARequest = ({ onClose }: any) => {
  const [formData, setFormData] = useState({
    child: "",
    age: "",
    grade: "",
    school: "",
    need: "",
    startDate: "",
    endDate: "",
    lsaType: "",
    lsaExperience: "",
    additionalComments: "",
    active: false,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleActiveChange = (e: any) => {
    const { checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      active: checked,
    }));
  };

  const handleCancelLSARequest = () => {
    console.log("cancel clicked");
    onClose();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Logic to submit form data
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-75 fixed inset-0 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">New SLA Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label htmlFor="child" className="block mb-2">
                  Child
                </label>
                <select
                  id="child"
                  name="child"
                  value={formData.child}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                >
                  {/* Options for Child dropdown */}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Age</label>
                <input
                  type="text"
                  value={formData.age}
                  className="w-full border rounded px-3 py-2"
                  disabled
                />
              </div>
              {/* Add other disabled text fields */}
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="startDate" className="block mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              {/* Add other fields */}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleActiveChange}
              className="mr-2"
            />
            <label htmlFor="active">Active</label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              onClick={handleCancelLSARequest}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-400 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSLARequest;
