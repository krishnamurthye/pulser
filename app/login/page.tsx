"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const router = useRouter();

  // const handleSubmit = async (values: any, actions: any) => {
  //   const { email, password } = values;

  //   try {
  //     const response = await fetch("http://localhost:4201/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username: email, password }), // Ensure this matches your backend expectations
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log("Login successful:", data);
  //       router.push("/parent-dashboard"); // Redirect on successful login
  //     } else {
  //       console.error("Login failed:", data.message);
  //       alert(data.message); // Show error message
  //     }
  //   } catch (error) {
  //     console.error("Network error:", error);
  //     alert("Failed to connect to the server");
  //   }
  //   actions.setSubmitting(false);
  // };

  const handleSubmit = async (values: any, actions: any) => {
    const { email, password } = values;
    try {
      const response = await fetch("http://localhost:4201/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);

        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);

        router.push("/parent-dashboard");
      } else {
        console.error("Login failed:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to connect to the server");
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
              className="w-full bg-blue-400 text-white py-2 rounded-md"
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
