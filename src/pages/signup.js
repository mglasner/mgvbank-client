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
  const [status, setStatus] = useState("");

  const router = useRouter();
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    try {
      const firebaseResponse = await signUp(email, password);
      if (firebaseResponse.error !== null) {
        setStatus(firebaseResponse.error.code);
        setTimeout(() => setStatus(""), 3000);
      } else {
        await fetch(`${apiURL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Signup</title>
      </Head>
      <Card
        header="Sign Up"
        status={status}
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
              minLength={6}
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
