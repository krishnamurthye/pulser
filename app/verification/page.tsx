"use client";

// pages/verification.js

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const VerificationSchema = Yup.object().shape({
  verificationCode: Yup.string().required("Verification code is required"),
});

const Verification = () => {
  const router = useRouter();

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    // Simulate form submission
    setTimeout(() => {
      // After submission, navigate to the dashboard or any other page
      router.push("/parent-dashboard");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Formik
        initialValues={{ verificationCode: "" }}
        validationSchema={VerificationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-sm">
            <h2 className="text-2xl mb-4 text-center">
              Enter Verification Code
            </h2>
            <div className="mb-4">
              <label htmlFor="verificationCode" className="block mb-2">
                Verification Code
              </label>
              <Field
                type="text"
                id="verificationCode"
                name="verificationCode"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="verificationCode"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="flex justify-center items-center space-x-4">
              <Link
                href={"/registration"}
                className="text-center text-blue-600 hover:text-blue-700"
              >
                <p className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 hover:bg-blue-50">
                  Back
                </p>
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium"
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Verification;
