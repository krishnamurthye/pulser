"use client";
import React, { useState } from "react";

const LSADashboard = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    attachments: [],
    nationality: "",
    ethnicity: "",
    education: "",
    specialization: "",
  });

  // Handle input change
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files);
    setFormData((prevData: any) => ({
      ...prevData,
      attachments: [...prevData.attachments, ...files],
    }));
  };

  const pastExperiencesTable = (
    <div className="p-4 grid grid-cols-1 gap-4">
      <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
        <p>Past Experience & Ratings:</p>
        <div className="overflow-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  School
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Student
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Start Date
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  End Date
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  DAS
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  6th Grader
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  29/08/2023
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  Active
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  NA/5.0
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Handle delete attachment
  const handleDeleteAttachment = (index: number) => {
    const updatedAttachments = [...formData.attachments];
    updatedAttachments.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      attachments: updatedAttachments,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Logic to save form data
    console.log(formData);
  };

  return (
    <div>
      <div className="p-4 grid grid-cols-3 gap-4">
        <h2 className="text-xl font-bold mb-4 col-span-3">My Profile</h2>
        {/* First column */}
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block mb-2">
              DOB
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4 pt-6">
            <label className="block mb-2 text-base font-bold ">
              <p>CV/Resume/Certificates</p>
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mb-2"
            />
            <ul>
              {formData.attachments.map((attachment, index) => (
                <li key={index} className="flex items-center">
                  <span>{attachment.name}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteAttachment(index)}
                    className="ml-2 text-red-500"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Second column */}
        <div>
          <div className="mb-4">
            <label htmlFor="nationality" className="block mb-2">
              Nationality
            </label>
            <select
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            >
              {/* Add options for nationality */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="ethnicity" className="block mb-2">
              Ethnicity
            </label>
            <select
              id="ethnicity"
              name="ethnicity"
              value={formData.ethnicity}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            >
              {/* Add options for ethnicity */}
            </select>
          </div>
          {/* Add past experiences & ratings table */}
        </div>
        {/* Third column */}
        <div>
          <div className="mb-4">
            <label htmlFor="education" className="block mb-2">
              Highest Education
            </label>
            <select
              id="education"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            >
              {/* Add options for education */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="specialization" className="block mb-2">
              Specialization
            </label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            >
              {/* Add options for specialization */}
            </select>
          </div>
        </div>
      </div>
      {pastExperiencesTable}
      {/* Save button */}
      <div className="col-span-3 flex justify-end">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-400 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default LSADashboard;
