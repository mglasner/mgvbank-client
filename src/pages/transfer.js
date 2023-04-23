"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Layout from "../../components/layout";
import Card from "../../components/card";

import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

export default function Transfer() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState(0);
  const [toUser, setToUser] = useState({});
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/`);
        const usersData = await response.json();
        const usersEmail = usersData.map((userData) => {
          return userData.email;
        });
        const usersEmailFiltered = usersEmail.filter(
          (email) => email !== firebaseUser.email
        );
        setUsers(usersEmailFiltered);
      } catch (error) {
        console.error(error);
      }
    };

    if (firebaseUser) {
      fetchUsers();
    }
  }, [firebaseUser]);

  const validateAmount = function (field) {
    if (isNaN(field)) {
      setStatus("Please enter a valid number");
      setAmount(0);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (field <= 0) {
      setStatus("Amount must be greater than $0");
      setAmount(0);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (field > balance) {
      setStatus(`Maximum amount available to transfer: $${balance}`);
      setAmount(0);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const handleTransfer = async function () {
    if (!validateAmount(amount)) {
      return;
    }
    try {
      console.log("toUSer", toUser);
      const response = await fetch(`http://localhost:3001/api/users/transfer`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: toUser, from: firebaseUser.email, amount }),
      });

      console.log(await response.json());
      setBalance(Number(balance) - Number(amount));
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = function () {
    setAmount(0);
    setShow(true);
  };

  return (
    <Layout>
      <Head>
        <title>Transfer</title>
      </Head>
      <Card
        header={`Balance: $${balance}`}
        status={status}
        body={
          show ? (
            <>
              <select
                name="users"
                className="form-control"
                onChange={(e) => setToUser(e.currentTarget.value)}
              >
                <option value="" key="-1"></option>
                {users.map((user, index) => (
                  <option value={user} key={index}>
                    {user}
                  </option>
                ))}
              </select>
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                required
                type="number"
                className="form-control"
                id="amount"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
              />
              <button
                type="submit"
                className={`btn btn-light mt-3 ${
                  amount === 0 ? "disabled" : ""
                }`}
                onClick={handleTransfer}
              >
                Transfer
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
                Make another transfer
              </button>
            </>
          )
        }
      />
    </Layout>
  );
}
