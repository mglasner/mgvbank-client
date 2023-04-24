"use client";
import Head from "next/head";
import Layout from "../../components/layout";

import { useRouter } from "next/router";
import { useState } from "react";

import Card from "../../components/card";
import signIn from "@/firebase/auth/signin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const router = useRouter();

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      const response = await signIn(email, password);
      if (response.error !== null) {
        setStatus(response.error.code);
        setTimeout(() => setStatus(""), 3000);
      } else {
        return router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <Card
        header="Log In"
        status={status}
        body={
          <form onSubmit={handleLogIn}>
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
              Log In
            </button>
          </form>
        }
      />
    </Layout>
  );
}
