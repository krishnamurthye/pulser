"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PersonIcon from "../../public/person-circle.svg";

const ProfileSchema = Yup.object().shape({
  userType: Yup.string().required("User type is required"),
  streetAddress: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string().required("Postal code is required"),
});

const Profile = () => {
  const initialValues = {
    name: "John Doe",
    email: "john@example.com",
    userType: "",
    streetAddress: "",
    city: "",
    postalCode: "",
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Complete Profile</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-2 gap-6">
              {/* First column */}
              <div>
                <div className="flex items-center mb-4">
                  <PersonIcon className="h-8 w-8 mr-2" />
                  <h2 className="text-lg font-semibold">Profile Details</h2>
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    disabled
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    disabled
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="changeMobile" className="block mb-2">
                    Change Mobile Number
                  </label>
                  <Field
                    type="text"
                    id="changeMobile"
                    name="changeMobile"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              {/* Second column */}
              <div>
                <div className="mb-4">
                  <span className="mr-2">User Type: </span>
                  <span>Parent</span>

                  {/* <Field
                    as="select"
                    id="userType"
                    name="userType"
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select User Type</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </Field> */}
                  <ErrorMessage
                    name="userType"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="streetAddress" className="block mb-2">
                    Street Address
                  </label>
                  <Field
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="streetAddress"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block mb-2">
                    City
                  </label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="postalCode" className="block mb-2">
                    Postal Code
                  </label>
                  <Field
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="postalCode"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-400 text-white px-4 py-2 rounded-md mr-2"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Back
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
