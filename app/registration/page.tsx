"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ROLES } from "../utils/constants";
import { authRoute, buildUrl } from "../utils/api";

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Mobile number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  userType: Yup.string().required("Please select a role"),
  // nationality: Yup.number().required("Please enter nationality"),
});

const getUserRole = (userType: any) => {
  return ROLES.find(
    (role) => role.name.toLowerCase() === userType.toLowerCase()
  )?.id;
};

const Registration = () => {
  const router = useRouter();

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const response = await fetch(buildUrl(authRoute, "register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber,
          role: getUserRole(values.userType),
          userType: values.userType?.toLowerCase(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();

      toast.success(
        "Registration successful. Please login to your account now!",
        {
          position: "top-right",
          className: "custom-toast",
        }
      );
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Sorry. Can't register!", {
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
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          userType: "Parent",
        }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-sm">
            <h2 className="text-2xl mb-4 text-center">Registration</h2>
            <div className="mb-6 mt-8">
              <div className="flex justify-around">
                <div className="flex items-center mr-6">
                  <Field
                    type="radio"
                    name="userType"
                    value="Parent"
                    id="userType-parent"
                    className="mr-2"
                  />
                  <label htmlFor="userType-parent">Parent</label>
                </div>

                <div className="flex items-center">
                  <Field
                    type="radio"
                    name="userType"
                    value="LSA"
                    id="userType-lsa"
                    className="mr-2"
                  />
                  <label htmlFor="userType-lsa">LSA</label>
                </div>
              </div>
              <ErrorMessage
                name="userType"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
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
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="w-full px-3 py-2 border rounded-md"
                autoComplete="true"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="w-full px-3 py-2 border rounded-md"
                autoComplete="true"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block mb-2">
                Phone number
              </label>
              <Field
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-600"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-400 text-white py-2 rounded-md mt-4"
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
