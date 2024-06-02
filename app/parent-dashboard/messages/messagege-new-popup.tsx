"use client";
import { createMessage } from "@/app/apis/api-calls";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  from: Yup.string().required("From is required"),
  to: Yup.string().email("Invalid email address").required("To is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
  attachment: Yup.mixed().nullable(),
});

const MessageNewPopUp = ({ onClose }: any) => {
  const formik = useFormik({
    initialValues: {
      from: "",
      to: "",
      subject: "",
      message: "",
      attachment: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("from", values.from);
      formData.append("to", values.to);
      formData.append("subject", values.subject);
      formData.append("message", values.message);
      if (values.attachment) {
        formData.append("attachment", values.attachment);
      }

      try {
        const result = await createMessage(formData);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
  });

  const handleFileChange = (e: any) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("attachment", file);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">New Message</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="from" className="block mb-2">
              From
            </label>
            <input
              type="text"
              id="from"
              name="from"
              value={formik.values.from}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded px-3 py-2 ${
                formik.touched.from && formik.errors.from
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.from && formik.errors.from ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.from}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="to" className="block mb-2">
              To
            </label>
            <input
              type="email"
              id="to"
              name="to"
              value={formik.values.to}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded px-3 py-2 ${
                formik.touched.to && formik.errors.to ? "border-red-500" : ""
              }`}
            />
            {formik.touched.to && formik.errors.to ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.to}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded px-3 py-2 ${
                formik.touched.subject && formik.errors.subject
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.subject && formik.errors.subject ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.subject}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date</label>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="attachment" className="block mb-2">
              Attachments
            </label>
            <input
              type="file"
              id="attachment"
              name="attachment"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded px-3 py-2 ${
                formik.touched.attachment && formik.errors.attachment
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.attachment && formik.errors.attachment ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.attachment}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded px-3 py-2 ${
                formik.touched.message && formik.errors.message
                  ? "border-red-500"
                  : ""
              }`}
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.message}
              </div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-400 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageNewPopUp;
