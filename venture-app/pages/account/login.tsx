import React, { useState } from "react";
import { Formik, Field } from "formik";
import { InputField } from "../../components/fields/InputField";
import { useRouter } from "next/router";
import fetchJson, { FetchError } from "../../lib/fetchJson";
import useUser from "../../lib/useUser";
import { KeyedMutator } from "swr";
import { User } from "../api/auth/user";

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
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            placeholder="email"
            type="email"
            component={InputField}
          />
          <Field
            name="password"
            placeholder="password"
            type="password"
            component={InputField}
          />
          <button type="submit">Login</button>
          {errorMsg}
        </form>
      )}
    </Formik>
  );
};
