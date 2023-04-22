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
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [withdraw, setWithdraw] = useState(0);
  const [user, setUser] = useState("");

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
    // if (field >= current_user.balance) {
    //   setStatus(
    //     `Maximum amount available to withdraw: $${current_user.balance}`
    //   );
    //   setWithdraw(0);
    //   setTimeout(() => setStatus(""), 3000);
    //   return false;
    // }
    return true;
  };

  const handleWithdraw = function () {
    if (!validateWithdraw(withdraw)) {
      return;
    }
    console.log("Whitdrawing ...");
    setShow(false);
  };

  const clearForm = function () {
    setWithdraw(0);
    setUser("");
    setShow(true);
  };

  return (
    <Layout>
      <Head>
        <title>Withdraw</title>
      </Head>
      <Card
        bgcolor="dark"
        header={`Balance: $${0}`}
        status={status}
        body={
          show ? (
            <>
              <label htmlFor="withdraw" className="form-label">
                Withdraw
              </label>
              <input
                type="number"
                className="form-control"
                id="withdraw"
                placeholder="Enter withdraw"
                value={withdraw}
                onChange={(e) => setWithdraw(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className={`btn btn-light ${
                  user === "" && withdraw === 0 ? "disabled" : ""
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
