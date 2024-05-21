"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { toast } from "react-toastify";

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dob: Yup.date().required("Invalid date of birth"),
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
  nationality: Yup.number().required("Please enter nationality"),
});

const Registration = () => {
  const router = useRouter();

  const handleSubmit = async (values, actions) => {
    try {
      console.log(values);
      const response = await fetch("http://localhost:4201/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          dob: values.dob,
          password: values.password,
          phoneNumber: values.phoneNumber,
          userType: values.userType,
          nationality: values.nationality,
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
          firstName: "",
          lastName: "",
          email: "",
          dob: "",
          nationality: "",
          password: "",
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
              <div className="flex justify-between">
                <div className="flex items-center mr-4">
                  <Field
                    type="radio"
                    name="userType"
                    value="Parent"
                    id="userType-parent"
                    className="mr-2"
                  />
                  <label htmlFor="userType-parent">Parent</label>
                </div>
                <div className="flex items-center mr-4">
                  <Field
                    type="radio"
                    name="userType"
                    value="Councillor"
                    id="userType-councillor"
                    className="mr-2"
                  />
                  <label htmlFor="userType-councillor">Councillor</label>
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
              <label htmlFor="firstName" className="block mb-2">
                First name
              </label>
              <Field
                type="text"
                name="firstName"
                id="firstName"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-2">
                Last name
              </label>
              <Field
                type="text"
                name="lastName"
                id="lastName"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="lastName"
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
              <label htmlFor="dob" className="block mb-2">
                DOB
              </label>
              <Field
                type="date"
                name="dob"
                id="dob"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="dob"
                component="div"
                className="text-red-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="nationality" className="block mb-2">
                Nationality
              </label>
              <Field
                type="text"
                name="nationality"
                id="nationality"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="nationality"
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
