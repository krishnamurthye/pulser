"use cleint";
import { useState } from "react";
import PersonIcon from "../../public/PersonIcon";
import { toast } from "react-toastify";

const ChildEditPopup = ({
  onClose,
  gradeList,
  needLevelList,
  schoolsList,
}: any) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    age: "",
    school: "",
    grade: "",
    needLevel: "",
    additionalInfo: "",
    isActive: false,
    username: localStorage.getItem("username"),
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    console.log(formData);

    try {
      const response = await fetch("http://localhost:4201/api/children/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Child added successfully!", {
          position: "top-right",
          className: "custom-toast",
        });
        onClose(); // Close popup and refresh list on success
      } else {
        toast.error("Failed to save child data", {
          position: "top-right",
          className: "custom-toast",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save child data", {
        position: "top-right",
        className: "custom-toast",
      });
    }
  };

  const allFieldsFilled = Object.values(formData).every((value) => {
    if (typeof value === "boolean") return true; // Ignore booleans for validation
    return value !== "";
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-98">
        <h2 className="text-lg font-semibold mb-4">Add a new child</h2>
        <div className="grid grid-cols-2 gap-10">
          {/* First Column */}
          <div>
            <div className="mb-4 flex items-center">
              <PersonIcon />
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="isActive">Active</label>
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            {/* Add other form fields for first column */}
          </div>
          {/* Second Column */}
          <div>
            <div className="mb-4">
              <label htmlFor="school" className="block mb-2">
                School
              </label>
              <select
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select School</option>
                {schoolsList.map((school: any) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="grade" className="block mb-2">
                Grade
              </label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Grade</option>
                {gradeList.map((grade: any) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="needLevel" className="block mb-2">
                Need Level
              </label>
              <select
                id="needLevel"
                name="needLevel"
                value={formData.needLevel}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Need Level</option>
                {needLevelList.map((needLevel: any) => (
                  <option key={needLevel.id} value={needLevel.id}>
                    {needLevel.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block mb-2">
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="additionalInfo" className="block mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            {/* Add other form fields for second column */}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!allFieldsFilled}
            className={`px-4 py-2 rounded-md ${
              allFieldsFilled
                ? "bg-green-400 text-white"
                : "bg-gray-400 text-gray-800"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildEditPopup;
