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
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push("/");
      }
    });
  }, [user]);

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

  const handleDeposit = function () {
    if (!validateDeposit(deposit)) {
      return;
    }
    // let current_user = findCurrentUser();
    // current_user.balance += deposit / 1;
    // current_user.history.unshift({ type: "deposit", amount: deposit });
    // setShow(false);
  };

  const clearForm = function () {
    setDeposit(0);
    // setUser("");
    setShow(true);
  };

  return (
    <Layout>
      <Head>
        <title>Deposit</title>
      </Head>
      <Card
        header={`Balance: lala`}
        status={status}
        body={
          show ? (
            <>
              <label htmlFor="deposit" className="form-label">
                Deposit
              </label>
              <input
                type="number"
                className="form-control"
                id="deposit"
                placeholder="Enter deposit"
                value={deposit}
                onChange={(e) => setDeposit(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className={`btn btn-light ${deposit === 0 ? "disabled" : ""}`}
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
