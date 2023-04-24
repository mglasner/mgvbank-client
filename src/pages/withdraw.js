"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import Layout from "../../components/layout";
import Card from "../../components/card";

import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

export default function Withdraw() {
  const [firebaseUser, setFirebaseUser] = useState("");
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [withdraw, setWithdraw] = useState(0);
  const [balance, setBalance] = useState(0);

  const router = useRouter();
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
        router.push("/");
      }
    });
  }, [firebaseUser]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiURL}/${firebaseUser.email}`);
        const userData = await response.json();
        setBalance(
          userData.history.reduce(
            (acc, transaction) => acc + transaction.amount,
            0
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (firebaseUser) {
      fetchUserData();
    }
  }, [firebaseUser]);

  const validateWithdraw = function (field) {
    if (isNaN(field)) {
      setStatus("Please enter a valid number");
      setWithdraw(0);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (field <= 0) {
      setStatus("Withdraws must be greater than $0");
      setWithdraw(0);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (field > balance) {
      setStatus(`Maximum amount available to withdraw: $${balance}`);
      setWithdraw(0);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const handleWithdraw = async function () {
    if (!validateWithdraw(withdraw)) {
      return;
    }
    const response = await fetch(`${apiURL}/withdraw/${firebaseUser.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ withdraw }),
    });
    const data = await response.json();
    console.log(data);
    setBalance(Number(balance) - Number(withdraw));
    setShow(false);
  };

  const clearForm = function () {
    setWithdraw(0);
    setFirebaseUser("");
    setShow(true);
  };

  return (
    <Layout>
      <Head>
        <title>Withdraw</title>
      </Head>
      <Card
        bgcolor="dark"
        header={`Balance: $${balance}`}
        status={status}
        body={
          show ? (
            <>
              <label htmlFor="withdraw" className="form-label">
                Withdraw
              </label>
              <input
                required
                min={0}
                type="number"
                className="form-control"
                id="withdraw"
                placeholder="Enter withdraw"
                value={withdraw}
                onChange={(e) => setWithdraw(e.currentTarget.value)}
              />
              <button
                type="submit"
                className={`btn btn-light  mt-3 ${
                  withdraw === 0 ? "disabled" : ""
                }`}
                onClick={handleWithdraw}
              >
                Withdraw
              </button>
            </>
          ) : (
            <>
              <h5>Success</h5>
              <button
                type="submit"
                className="btn btn-light"
                onClick={clearForm}
              >
                Make another withdraw
              </button>
            </>
          )
        }
      />
    </Layout>
  );
}
