"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ROLES, ROLE_MAPPING } from "../utils/constants";
import { toast } from "react-toastify";
import { authRoute, buildUrl } from "../utils/api";
import { useAuth } from "../utils/AuthContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const router = useRouter();

  const { login } = useAuth();

  const getUserRoleName = (userRoleId: number) => {
    return ROLES.filter((role) => role.id === userRoleId)[0].name;
  };

  const handleSubmit = async (values: any, actions: any) => {
    const { email, password } = values;
    try {
      const response = await fetch(buildUrl(authRoute, "login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Login Success!", {
          position: "top-right",
          className: "custom-toast",
        });

        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);
        // localStorage.setItem("role", data?.user?.role);
        // localStorage.setItem("username", data?.user?.username);

        login(data.token);

        const roleName = getUserRoleName(data?.user?.role);

        switch (roleName) {
          case ROLE_MAPPING.PARENT:
            router.push("/parent-dashboard");
            break;
          case ROLE_MAPPING.COUNCILLOR:
            router.push("/parent-dashboard");
            break;
          case ROLE_MAPPING.LSA:
            router.push("/lsa-dashboard");
            break;
          default:
            router.push("/parent-dashboard");
        }
      } else {
        console.error("Login failed:", data.message);
        toast.error(data.message, {
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
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-xs">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
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
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-400 text-white py-2 rounded-md"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
