"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { authRoute, buildUrl } from "../utils/api";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const handleSubmit = async (values: any, actions: any) => {
    try {
      const response = await fetch(
        buildUrl(authRoute, "request-reset-password"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset link sent to your email!", {
          position: "top-right",
          className: "custom-toast",
        });
      } else {
        toast.error(data.message || "Failed to send reset link", {
          position: "top-right",
          className: "custom-toast",
        });
      }
    } catch (error) {
      console.error("Network error:", error);

      toast.error("Failed to connect to the server", {
        position: "top-right",
        className: "custom-toast",
      });
    }

    actions.setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-xs">
            <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Enter your email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-400 text-white py-2 rounded-md"
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
