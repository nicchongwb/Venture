import { Formik, Field } from "formik";
import React from "react";
import InputField from "../../components/Layout/fields/InputField";

export default () => {
  return (
    <>
      <Formik
        onSubmit={(userData) => {
          console.log(userData);
        }}
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="firstName"
              placeholder="First Name"
              component={InputField}
            />
            <Field
              name="lastName"
              placeholder="Last Name"
              component={InputField}
            />
            <Field name="email" placeholder="Email" component={InputField} />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              component={InputField}
            />
            <button type="submit">Sign Up</button>
          </form>
        )}
      </Formik>
    </>
  );
};
