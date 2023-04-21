"use client";
import Head from "next/head";
import Layout from "../../components/layout";

import { useRouter } from "next/router";
import { useState } from "react";

import Card from "../../components/card";
import signUp from "@/firebase/auth/signup";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    const { result, error } = await signUp(email, password);
    if (error) {
      return console.log(error);
    }
    // else successful
    console.log(result);
    return router.push("/");
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
          <form onSubmit={handleCreateAccount}>
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
            <button type="submit" className="btn btn-light mt-3">
              Create Account
            </button>
          </form>
        }
      />
    </Layout>
  );
}
