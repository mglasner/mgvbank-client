import { useState } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import Card from "../../components/card";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";

// import {
//   AuthAction,
//   useAuthUser,
//   withAuthUser,
//   withAuthUserTokenSSR,
// } from "next-firebase-auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = () => {
    console.log(name, email, password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let { user } = userCredential;
        console.log(user);
        let router = useRouter();
        router.push("/");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <Layout>
      <Head>
        <title>Signup</title>
      </Head>
      <Card
        header="Sign Up"
        status=""
        body={
          <form>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              required
              type="text"
              className="form-control mb-1"
              id="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              required
              type="email"
              className="form-control mb-1"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              required
              minLength={5}
              type="password"
              className="form-control mb-1"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <button
              // type="submit"
              type="button"
              className="btn btn-light mt-3"
              onClick={handleCreateAccount}
            >
              Create Account
            </button>
          </form>
        }
      />
    </Layout>
  );
}

// export const getServerSideProps = withAuthUserTokenSSR({
//   whenAuthed: AuthAction.REDIRECT_TO_APP,
//   appPageURL: "/",
// })(() => {
//   return {
//     props: {},
//   };
// });
// export default withAuthUser()(SignUp);
