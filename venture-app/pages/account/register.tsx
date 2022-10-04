import React from "react";
import { Formik, Field } from "formik";
import { InputField } from "../../components/fields/InputField";
import * as Yup from "yup";
import { useRouter } from "next/router";
// import bcrypt from 'bcrypt'
// import argon2 from "argon2";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
});

// do field level validation for field password
// https://formik.org/docs/guides/validation

export type AccountProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// call api to update db with account
async function register(account: AccountProps) {
  // HASH PASSWORD HERE
  // const hashed = bcrypt.hash(account.password, 10)

  //  const hash = await argon2.hash(account.password);
  // console.log(hash)

  const response = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(account),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export default () => {
  const router = useRouter();
  let emailExists = false;
  return (
    <Formik
      //call your auth/register route while passing data in onsubmit
      // has to be async anonym func and need to await
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={async (data) => {
        try {
          const response = await register(data);
          if (response === "Email already exists") emailExists = true;
          else {
            emailExists = false;
            // after success, redirct to hom. need some feedback on success like a toast
            router.push("/account/check-email");
          }
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            placeholder="first name"
            type="text"
            component={InputField}
          />
          {errors.firstName && touched.firstName ? (
            <div>{errors.firstName}</div>
          ) : null}
          <Field
            name="lastName"
            placeholder="last name"
            type="text"
            component={InputField}
          />
          {errors.lastName && touched.lastName ? (
            <div>{errors.lastName}</div>
          ) : null}
          <Field
            name="email"
            placeholder="email"
            type="email"
            component={InputField}
          />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field
            name="password"
            placeholder="password"
            type="password"
            component={InputField}
          />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <button type="submit">Register</button>
          {emailExists && (
            <div>Email already in use, please try another email.</div>
          )}
        </form>
      )}
    </Formik>
  );
};
