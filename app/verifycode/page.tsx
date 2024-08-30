"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authRoute, buildUrl } from "../utils/api";

const VerifyCodeSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .required("Verification code is required")
    .length(6, "Verification code must be 6 digits"),
});

const VerifyCode = () => {
  const router = useRouter();

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const response = await fetch(buildUrl(authRoute, "verify-code"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: values.verificationCode,
        }),
      });

      if (!response.ok) {
        throw new Error("Verification failed");
      }

      const data = await response.json();

      const token = data.token;

      toast.success("Verification successful! Redirecting to your profile...", {
        position: "top-right",
        className: "custom-toast",
      });

      // Redirect to the profile-schema page with the token as a query parameter
      router.push(`/profile-schema?token=${token}`);

    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Sorry, verification failed!", {
        position: "top-right",
        className: "custom-toast",
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Formik
        initialValues={{ verificationCode: "" }}
        validationSchema={VerifyCodeSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-sm">
            <h2 className="text-2xl mb-4 text-center">Verify Your Code</h2>
            <div className="mb-4">
              <label htmlFor="verificationCode" className="block mb-2">
                Verification Code
              </label>
              <Field
                type="text"
                name="verificationCode"
                id="verificationCode"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="verificationCode"
                component="div"
                className="text-red-600"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-400 text-white py-2 rounded-md mt-4"
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyCode;
