"use client";
import { buildUrl, lsaRoute, parentRoute } from "@/app/utils/api";
import { getAuthToken } from "@/app/utils/util-fn";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  fetchChildrenForParent,
  fetchSchoolSystems,
} from "@/app/apis/api-calls";

const validationSchema = Yup.object().shape({
  child: Yup.string().required("Child is required"),
  age: Yup.number()
    .required("Age is required")
    .min(1, "Age must be greater than 0"),
  grade: Yup.string().required("Grade is required"),
  school: Yup.string().required("School is required"),
  needs: Yup.string().required("Needs are required"),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().required("End date is required"),
  lsaType: Yup.string().required("LSA Type is required"),
  experience: Yup.string().required("Experience is required"),
  comments: Yup.string().required("Comments are required"),
});

const NewSLARequest = ({ onClose }: any) => {
  const formik = useFormik({
    initialValues: {
      child: "",
      age: "",
      grade: "",
      school: "",
      needs: "",
      start_date: "",
      end_date: "",
      lsaType: "",
      experience: "",
      comments: "",
      active: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const lsaRequestData = {
        child: values.child,
        age: values.age,
        grade: values.grade,
        school: values.school,
        needs: values.needs,
        start_date: values.start_date,
        end_date: values.end_date,
        lsaType: values.lsaType,
        experience: values.experience,
        comments: values.comments,
      };

      try {
        const token = getAuthToken();
        const response = await fetch(buildUrl(lsaRoute, "/create"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(lsaRequestData),
        });

        if (response.ok) {
          const result = await response.json();
          toast.success("LSA request added successfully!", {
            position: "top-right",
            className: "custom-toast",
          });
          onClose(); // Close popup and refresh list on success
        } else {
          toast.error("Failed to add LSA request", {
            position: "top-right",
            className: "custom-toast",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to add LSA request", {
          position: "top-right",
          className: "custom-toast",
        });
      }
    },
  });

  const [children, setChildren] = useState([]);
  const [schoolSystems, setSchoolSystems] = useState([]);

  const handleCancelLSARequest = () => {
    formik.resetForm();
    onClose();
  };

  useEffect(() => {
    getChildren();
    getSchoolSystems();
  }, []);

  const getChildren = async () => {
    const result: any = await fetchChildrenForParent();
    setChildren(result);
  };

  const getSchoolSystems = async () => {
    const result: any = await fetchSchoolSystems();
    setSchoolSystems(result);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-75 fixed inset-0 z-50">
      <div className="bg-white p-6 rounded shadow-md w-150">
        <h2 className="text-lg font-bold mb-4">New SLA Request</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label htmlFor="child" className="block mb-2">
                  Child Name
                </label>
                <select
                  id="child"
                  name="child"
                  value={formik.values.child}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.child && formik.errors.child
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <option value="" label="Select child" />
                  {children?.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.firstName + " " + child.lastName}
                    </option>
                  ))}
                </select>

                {formik.touched.child && formik.errors.child ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.child}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block mb-2">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.age && formik.errors.age
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.age && formik.errors.age ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.age}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="grade" className="block mb-2">
                  Grade
                </label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  value={formik.values.grade}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.grade && formik.errors.grade
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.grade && formik.errors.grade ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.grade}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="school" className="block mb-2">
                  School
                </label>
                <select
                  id="school"
                  name="school"
                  value={formik.values.school}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.school && formik.errors.school
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <option value="" label="Select school" />
                  {schoolSystems?.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
                {formik.touched.school && formik.errors.school ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.school}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="needs" className="block mb-2">
                  Needs
                </label>
                <input
                  type="text"
                  id="needs"
                  name="needs"
                  value={formik.values.needs}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.needs && formik.errors.needs
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.needs && formik.errors.needs ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.needs}
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="start_date" className="block mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formik.values.start_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.start_date && formik.errors.start_date
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.start_date && formik.errors.start_date ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.start_date}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="end_date" className="block mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formik.values.end_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.end_date && formik.errors.end_date
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.end_date && formik.errors.end_date ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.end_date}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="lsaType" className="block mb-2">
                  LSA Type
                </label>
                <input
                  type="text"
                  id="lsaType"
                  name="lsaType"
                  value={formik.values.lsaType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.lsaType && formik.errors.lsaType
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.lsaType && formik.errors.lsaType ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.lsaType}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="experience" className="block mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.experience && formik.errors.experience
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.experience && formik.errors.experience ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.experience}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="comments" className="block mb-2">
                  Comments
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formik.values.comments}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border rounded px-3 py-2 ${
                    formik.touched.comments && formik.errors.comments
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.comments && formik.errors.comments ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.comments}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formik.values.active}
              onChange={formik.handleChange}
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
              className="bg-green-400 text-white px-4 py-2 rounded"
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
