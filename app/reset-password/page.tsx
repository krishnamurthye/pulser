"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { authRoute, buildUrl } from "../utils/api";

// Validation schema for password reset form
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading
  const validationInProgress = useRef(false); // Ref to track if validation is in progress

  // Effect to extract token and validate it
  useEffect(() => {
    const token = searchParams.get("token");
    console.log("Token extracted:", token); // Log the token to the console

    if (token) {
      setToken(token);

      // Check if validation is already in progress
      if (!validationInProgress.current) {
        validationInProgress.current = true;
        validateToken(token);
      }
    } else {
      // Token is missing; set loading to false
      setLoading(false);
      toast.error("Token is missing or invalid", {
        position: "top-right",
        className: "custom-toast",
      });
    }
  }, [searchParams]);

  // Function to validate the token
  const validateToken = async (token) => {
    try {
      const response = await fetch(
        buildUrl(authRoute, "validate-reset-token"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
        toast.error(data.message || "Token is expired or invalid", {
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
      // Set loading to false after validation is complete
      setLoading(false);
      validationInProgress.current = false; // Reset validation flag
    }
  };

  // Function to handle form submission
  const handleSubmit = async (values, actions) => {
    if (!token || !isTokenValid) {
      toast.error("Token is missing or invalid", {
        position: "top-right",
        className: "custom-toast",
      });
      actions.setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        buildUrl(authRoute, "reset-password"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, token }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Password has been reset successfully!", {
          position: "top-right",
          className: "custom-toast",
        });
        router.push("/login"); // Redirect to login page
      } else {
        toast.error(data.message || "Failed to reset password", {
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

  // Show loading message or form based on validation status
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
              <div className="text-center">Validating token...</div>
            </div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {isTokenValid ? (
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={ResetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-xs">
              <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2">
                  New Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-3 py-2 border rounded-md"
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
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-400 text-white py-2 rounded-md"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="text-red-600 text-center">
          <h1 className="text-3xl font-bold mb-6">Link Expired</h1>
          <p>Please request a new password reset link.</p>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
