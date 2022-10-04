import React from "react";
import { Formik, Field } from "formik";
import { InputField } from "../../components/fields/InputField";
import * as Yup from "yup";
import { useRouter } from "next/router";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
        <div className="flex justify-center p-2 mx-auto my-10 shadow-lg w-1/2">
       
        <form  onSubmit={handleSubmit}>
        <div className="flex justify-center ">
        <AccountCircleIcon  className="text-indigo-600 text-6xl"/> 
        </div>
       <div className="flex justify-center ">
        <h1>
          Register 
        </h1>
       </div>
             <label className='mr-4 text-2xl pt-6'>
             First Name:
             <br/>
          <Field
            name="firstName"
            placeholder="first name"
            type="text"
            component={InputField}
          />
          </label>
          <br/> 
          {errors.firstName && touched.firstName ? (
            <div>{errors.firstName}</div>
          ) : null}

          <label className='mr-4 text-2xl pt-6'>
             Last Name:
             <br/>
          <Field
            name="lastName"
            placeholder="last name"
            type="text"
            component={InputField}
          />
           </label>
          <br/> 
          {errors.lastName && touched.lastName ? (
            <div>{errors.lastName}</div>
          ) : null}

            <label className='mr-4 text-2xl pt-6'>
             Email:
             <br/>
          <Field
            name="email"
            placeholder="email"
            type="email"
            component={InputField}
          />
          </label>
          <br/> 
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <label className='mr-4 text-2xl pt-6'>
             Password:
             <br/>
          <Field
            name="password"
            placeholder="password"
            type="password"
            component={InputField}
          />
          </label>
          <br/> 
          <br/> 
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <div className="flex justify-center">
          <button className=" px-8 py-3 bg-indigo-600 mt-10 mb-5 " type="submit">Register</button>
          </div>
          {emailExists && (
            <div>Email already in use, please try another email.</div>
          )}
        </form>
        </div>
      )}
    </Formik>
  );
};
