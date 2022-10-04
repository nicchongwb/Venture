import React, { useState } from "react";
import { Formik, Field } from "formik";
import { InputField } from "../../components/fields/InputField";
import { useRouter } from "next/router";
import fetchJson, { FetchError } from "../../lib/fetchJson";
import useUser from "../../lib/useUser";
import { KeyedMutator } from "swr";
import { User } from "../api/auth/user";
import LockOpenIcon from '@mui/icons-material/LockOpen';

async function login(
  data: any,
  mutateUser: KeyedMutator<User>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
) {
  // const response = await fetch("/api/auth/login", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  // });

  // if (!response.ok) {
  //   throw new Error(response.statusText);
  // }
  try {
    mutateUser(
      await fetchJson("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    );
  } catch (error) {
    if (error instanceof FetchError) {
      setErrorMsg(error.data.message);
    } else {
      console.error("An unexpected error happened: ", error);
    }
  }
  //return await response.json();
}

export default () => {
  // redirect if already logged in

  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  return (
    <Formik
      //call your auth/register route while passing data in onsubmit
      // has to be async anonym func and need to await
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (data) => {
        try {
          const response = await login(data, mutateUser, setErrorMsg);
          // logged in successfully
          //console.log("response from login: ", response.ok);
          setErrorMsg("");
        } catch (err) {
          setErrorMsg("Invalid Login");
        }
      }}
    >
      {({ handleSubmit, errors, touched }) => (
     <div className="flex justify-center p-2 mx-auto my-10 shadow-lg w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center ">
            <LockOpenIcon  className="text-indigo-600 text-6xl"/> 
            </div>
          <div className="flex justify-center ">
            <h1>
              Login
            </h1>
          </div>
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
          <div className="flex justify-center">
            <button className=" px-8 py-3 bg-indigo-600 mt-10 mb-5 " type="submit">Login</button>
          </div>
          <div className="flex justify-center">
           No account on venture? &nbsp;<a href="/account/register"> Register now</a>
          </div>
          <br></br>
          {errorMsg}
        </form>
        </div>
      )}
    </Formik>
  );
};
