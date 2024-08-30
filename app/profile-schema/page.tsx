"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { authRoute, buildUrl } from "../utils/api";

// Validation schema for profile form
const ProfileSchema = Yup.object().shape({
    streetAddress: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string().required("Postal code is required"),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Invalid phone number")
        .required("Mobile number is required"),
});

const Profile = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const validationInProgress = useRef(false);

    // Effect to extract token and fetch user data
    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            setToken(token);

            if (!validationInProgress.current) {
                validationInProgress.current = true;
                fetchUserData(token);
            }
        } else {
            setLoading(false);
            toast.error("Token is missing or invalid", {
                position: "top-right",
                className: "custom-toast",
            });
        }
    }, [searchParams]);

    // Function to fetch user data
    const fetchUserData = async (token) => {
        try {
            const response = await fetch(buildUrl(authRoute, "get-profile"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();
            if (response.ok) {
                setUserData(data);
            } else {
                toast.error(data.message || "Failed to fetch user data", {
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
        } finally {
            setLoading(false);
            validationInProgress.current = false;
        }
    };

    // Function to handle form submission
    const handleSubmit = async (values, actions) => {
        try {
            // Prepare the request body with necessary fields
            const body = {
                token: token,
                phoneNumber: values.phoneNumber,
                streetAddress: values.streetAddress,
                city: values.city,
                postalCode: values.postalCode,
            };

            const response = await fetch(buildUrl(authRoute, "update-profile"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body), // Convert the body object to JSON
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Profile updated successfully!, Please login!", {
                    position: "top-right",
                    className: "custom-toast",
                });
                router.push("/login");
            } else {
                toast.error(data.message || "Failed to update profile", {
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


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
        <div className="text-center">Loading user data...</div>
      </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
      {userData ? (
        <Formik
          initialValues={{
            name: userData.name,
            email: userData.email,
            userType: userData.userType,
            phoneNumber: userData.phoneNumber,
            streetAddress: "",
            city: "",
            postalCode: "",
          }}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-md">
              <h1 className="text-3xl font-bold mb-6">Complete your Profile</h1>
              
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block mb-2">Name</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    disabled
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    disabled
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="userType" className="block mb-2">User Type</label>
                  <Field
                    type="text"
                    name="userType"
                    id="userType"
                    disabled
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
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
              </div>
              <div className="mb-4">
                  <label htmlFor="streetAddress" className="block mb-2">Street Address</label>
                  <Field
                    type="text"
                    name="streetAddress"
                    id="streetAddress"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="streetAddress"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                  <label htmlFor="city" className="block mb-2">City</label>
                  <Field
                    type="text"
                    name="city"
                    id="city"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block mb-2">Postal Code</label>
                <Field
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <ErrorMessage
                  name="postalCode"
                  component="div"
                  className="text-red-600"
                />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-400 text-white py-2 rounded-md"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="text-red-600 text-center">
          <h1 className="text-3xl font-bold mb-6">Error</h1>
          <p>Failed to load user data.</p>
        </div>
      )}
    </div>
    );
};

export default Profile;