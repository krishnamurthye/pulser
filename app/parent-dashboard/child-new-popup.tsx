"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { buildUrl, parentRoute } from "../utils/api";
import { getAuthToken } from "../utils/util-fn";
import {
  fetchGrades,
  fetchNeedLevels,
  fetchSchoolSystems,
} from "../apis/api-calls";

const AddChildPopup = ({ onClose }: any) => {
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
    //username: localStorage.getItem("username"),
  });

  const [schoolsList, setSchoolsList] = useState([]);
  const [gradesList, setGradessList] = useState([]);
  const [needsList, setNeedsList] = useState([]);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    age: "",
    school: "",
    grade: "",
    needLevel: "",
    additionalInfo: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error when user types
    }));
  };

  useEffect(() => {
    getSchoolSystems();
    getGrades();
    getNeedLevels();
  }, []);

  const getSchoolSystems = async () => {
    const schoolsList: any = await fetchSchoolSystems();
    setSchoolsList(schoolsList);
  };

  const getGrades = async () => {
    const grades: any = await fetchGrades();
    setGradessList(grades);
  };

  const getNeedLevels = async () => {
    const needsList: any = await fetchNeedLevels();
    setNeedsList(needsList);
  };

const validateForm = () => {
    console.log("Validating form data:", formData);
    
    const newErrors: any = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.dob.trim()) newErrors.dob = "Date of Birth is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.school.trim()) newErrors.school = "School is required";
    if (!formData.grade.trim()) newErrors.grade = "Grade is required";
    if (!formData.needLevel.trim()) newErrors.needLevel = "Need Level is required";
    if (!formData.additionalInfo.trim()) newErrors.additionalInfo = "Additional Information is required";

    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
};


const handleSave = async () => {
    if (!validateForm()) {
        toast.error("Please fill out all required fields", {
            position: "top-right",
            className: "custom-toast",
        });
        return; // Prevent form submission if validation fails
    }

    // Capitalize the first letter of firstName and lastName
    formData.firstName = formData.firstName.charAt(0).toUpperCase() + formData.firstName.slice(1).toLowerCase();
    formData.lastName = formData.lastName.charAt(0).toUpperCase() + formData.lastName.slice(1).toLowerCase();
    formData.additionalInfo = formData.additionalInfo.charAt(0).toUpperCase() + formData.additionalInfo.slice(1).toLowerCase();

    try {
        const token = getAuthToken();
        const response = await fetch(buildUrl(parentRoute, "add/child"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-98">
        <h2 className="text-lg font-semibold mb-4">Add a new child</h2>
        <div className="grid grid-cols-2 gap-10">
          {/* First Column */}
          <div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-2">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.firstName ? "border-red-600" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-2">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.lastName ? "border-red-600" : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block mb-2">
                Date of Birth <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.dob ? "border-red-600" : ""
                }`}
              />
              {errors.dob && (
                <p className="text-red-600 text-sm mt-1">{errors.dob}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block mb-2">
                Age <span className="text-red-600">*</span>
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
              {errors.age && <p className="text-red-500">{errors.age}</p>}
            </div>
            <div className="mb-4 flex items-center">
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
          </div>
          {/* Second Column */}
          <div>
            <div className="mb-4">
              <label htmlFor="school" className="block mb-2">
                School <span className="text-red-600">*</span>
              </label>
              <select
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.school ? "border-red-600" : ""
                }`}
              >
                <option value="">Select School</option>
                {schoolsList?.map((school: any) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
              {errors.school && (
                <p className="text-red-600 text-sm mt-1">{errors.school}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="grade" className="block mb-2">
                Grade <span className="text-red-600">*</span>
              </label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.grade ? "border-red-600" : ""
                }`}
              >
                <option value="">Select Grade</option>
                {gradesList?.map((grade: any) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p className="text-red-600 text-sm mt-1">{errors.grade}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="needLevel" className="block mb-2">
                Need Level <span className="text-red-600">*</span>
              </label>
              <select
                id="needLevel"
                name="needLevel"
                value={formData.needLevel}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.needLevel ? "border-red-600" : ""
                }`}
              >
                <option value="">Select Need Level</option>
                {needsList?.map((need: any) => (
                  <option key={need.id} value={need.id}>
                    {need.name}
                  </option>
                ))}
              </select>
              {errors.needLevel && (
                <p className="text-red-600 text-sm mt-1">{errors.needLevel}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="additionalInfo" className="block mb-2">
                Additional Information <span className="text-red-600">*</span>
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.additionalInfo ? "border-red-600" : ""
                }`}
              />
              {errors.additionalInfo && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.additionalInfo}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-green-400 text-white rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChildPopup;
