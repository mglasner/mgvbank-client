"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Layout from "../../components/layout";
import Card from "../../components/card";

import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

export default function Deposit() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [balance, setBalance] = useState(0);

  const router = useRouter();

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
        const response = await fetch(
          `http://localhost:3001/api/users/email/${firebaseUser.email}`
        );
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

  const validateDeposit = function (field) {
    if (isNaN(field)) {
      setStatus("Please enter a valid number");
      setDeposit(0);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (field <= 0) {
      setStatus("Deposits must be greater than $0");
      setDeposit(0);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const handleDeposit = async function () {
    if (!validateDeposit(deposit)) {
      return;
    }
    const response = await fetch(
      `http://localhost:3001/api/users/deposit/${firebaseUser.email}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deposit }),
      }
    );

    const data = await response.json();
    console.log(data);
    setBalance(Number(balance) + Number(deposit));
    setShow(false);
  };

  const clearForm = function () {
    setDeposit(0);
    setShow(true);
  };

  return (
    <Layout>
      <Head>
        <title>Deposit</title>
      </Head>
      <Card
        header={`Balance: $${balance}`}
        status={status}
        body={
          show ? (
            <>
              <label htmlFor="deposit" className="form-label">
                Deposit
              </label>
              <input
                required
                min={0}
                type="number"
                className="form-control"
                id="deposit"
                placeholder="Enter deposit"
                value={deposit}
                onChange={(e) => setDeposit(e.currentTarget.value)}
              />
              <button
                type="submit"
                className={`btn btn-light mt-3 ${
                  deposit === 0 ? "disabled" : ""
                }`}
                onClick={handleDeposit}
              >
                Deposit
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
                Add another deposit
              </button>
            </>
          )
        }
      />
    </Layout>
  );
}
