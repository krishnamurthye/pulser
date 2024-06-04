"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  fetchProfile,
  updateProfile,
  addWorkExperience,
} from "@/app/apis/api-calls"; // Adjust the import as per your project structure
import PastExperiencesTable from "./pastExperienceTable";
import { toast } from "react-toastify";

const nationalities = [
  "American",
  "Canadian",
  "British",
  "Australian",
  "Indian", // Add all nationalities
];

const highestEducations = [
  "High School",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate", // Add other education levels
];

const ethnicities = [
  "Asian",
  "Black",
  "Hispanic",
  "White",
  "Other", // Add other ethnicities
];

const genders = [
  "Male",
  "Female",
  "Other", // Add other gender options
];

const specializations = [
  "Mathematics",
  "Science",
  "Arts",
  "Physical Education",
  "Other", // Add other specializations
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  nationality: Yup.string().required("Nationality is required"),
  highestEducation: Yup.string().required("Highest education is required"),
  dob: Yup.date(),
  ethnicity: Yup.string().required("Ethnicity is required"),
  specialization: Yup.string().required("Specialization is required"),
  gender: Yup.string().required("Gender is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});

const LsaProfile = () => {
  const [profile, setProfile] = useState(null);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [showWorkExperienceForm, setShowWorkExperienceForm] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const result = await fetchProfile();

      setProfile(result);
      setWorkExperiences(result.workExperiences);

      setWorkExperiences(result.workExperiences);

      // Set form values with fetched profile data
      formik.setFieldValue("firstName", result.firstName || "");
      formik.setFieldValue("lastName", result.lastName || "");
      formik.setFieldValue("nationality", result.nationality || "");
      formik.setFieldValue("highestEducation", result.highestEducation || "");
      formik.setFieldValue("dob", result.dob || "");
      formik.setFieldValue("ethnicity", result.ethnicity || "");
      formik.setFieldValue("specialization", result.specialization || "");
      formik.setFieldValue("gender", result.gender || "");
      formik.setFieldValue("phoneNumber", result.phoneNumber || "");
      formik.setFieldValue("cv", null);
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Error loading profile:" + error?.message, {
        position: "top-right",
        className: "custom-toast",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      nationality: "",
      highestEducation: "",
      dob: "",
      ethnicity: "",
      specialization: "",
      gender: "",
      phoneNumber: "",
      cv: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (values[key]) {
          formData.append(key, values[key]);
        }
      });

      try {
        await updateProfile(formData);
        loadProfile();
      } catch (error: any) {
        toast.error(error?.message, {
          position: "top-right",
          className: "custom-toast",
        });
        console.error("Error updating profile:", error);
        toast.error("Error updating profile:" + error?.message, {
          position: "top-right",
          className: "custom-toast",
        });
      }
    },
  });

  const handleFileChange = (e: any) => {
    formik.setFieldValue("cv", e.currentTarget.files[0]);
  };

  const handleAddWorkExperience = async (workExperience: any) => {
    try {
      await addWorkExperience(workExperience);
      loadProfile();
    } catch (error) {
      console.error("Error adding work experience:", error);
      toast.error("Error adding work experience: " + error?.message, {
        position: "top-right",
        className: "custom-toast",
      });
    }
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.firstName && formik.errors.firstName
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.firstName}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.lastName && formik.errors.lastName
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.lastName}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="nationality" className="block mb-2">
            Nationality
          </label>
          <select
            id="nationality"
            name="nationality"
            value={formik.values.nationality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.nationality && formik.errors.nationality
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="">Select nationality</option>
            {nationalities.map((nationality, index) => (
              <option key={index} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
          {formik.touched.nationality && formik.errors.nationality ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.nationality}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="highestEducation" className="block mb-2">
            Highest Education
          </label>
          <select
            id="highestEducation"
            name="highestEducation"
            value={formik.values.highestEducation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.highestEducation && formik.errors.highestEducation
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="">Select education</option>
            {highestEducations.map((education, index) => (
              <option key={index} value={education}>
                {education}
              </option>
            ))}
          </select>
          {formik.touched.highestEducation && formik.errors.highestEducation ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.highestEducation}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="dob" className="block mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.dob && formik.errors.dob ? "border-red-500" : ""
            }`}
          />
          {formik.touched.dob && formik.errors.dob ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.dob}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="ethnicity" className="block mb-2">
            Ethnicity
          </label>
          <select
            id="ethnicity"
            name="ethnicity"
            value={formik.values.ethnicity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.ethnicity && formik.errors.ethnicity
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="">Select ethnicity</option>
            {ethnicities.map((ethnicity, index) => (
              <option key={index} value={ethnicity}>
                {ethnicity}
              </option>
            ))}
          </select>
          {formik.touched.ethnicity && formik.errors.ethnicity ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.ethnicity}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="specialization" className="block mb-2">
            Specialization
          </label>
          <select
            id="specialization"
            name="specialization"
            value={formik.values.specialization}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.specialization && formik.errors.specialization
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="">Select specialization</option>
            {specializations.map((specialization, index) => (
              <option key={index} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>
          {formik.touched.specialization && formik.errors.specialization ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.specialization}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-2">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.gender && formik.errors.gender
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="">Select gender</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.gender}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-2">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.phoneNumber}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="cv" className="block mb-2">
            CV
          </label>
          <input
            type="file"
            id="cv"
            name="cv"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-400 text-white py-2 px-4 rounded"
        >
          Update Profile
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Work Experience</h3>
        <button
          onClick={() => setShowWorkExperienceForm(true)}
          className="text-blue-500 mb-4"
        >
          + Add Work Experience
        </button>
        {showWorkExperienceForm && (
          <WorkExperienceForm onAdd={handleAddWorkExperience} />
        )}
        <ul>
          {/* {workExperiences.map((exp: any) => (
            <li key={exp.id}>
              <p>
                {exp.school} - {exp.student}
              </p>
              <p>
                {new Date(exp.startDate).toLocaleDateString()} -{" "}
                {new Date(exp.endDate).toLocaleDateString()}
              </p>
              <p>Rating: {exp.rating}</p>
            </li>
          ))} */}
          <PastExperiencesTable pastExperiences={workExperiences} />
        </ul>
      </div>
    </div>
  );
};

const WorkExperienceForm = ({ onAdd }: any) => {
  const [school, setSchool] = useState("");
  const [student, setStudent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(school, student, startDate, endDate, rating);

    onAdd({ school, student, startDate, endDate, rating });
    setSchool("");
    setStudent("");
    setStartDate("");
    setEndDate("");
    setRating("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-4">
        <label htmlFor="school" className="block mb-2">
          School
        </label>
        <input
          type="text"
          id="school"
          name="school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="student" className="block mb-2">
          Student
        </label>
        <input
          type="text"
          id="student"
          name="student"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block mb-2">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block mb-2">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block mb-2">
          Rating
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="bg-green-400 text-white py-2 px-4 rounded"
      >
        Add Work Experience
      </button>
    </form>
  );
};

export default LsaProfile;
