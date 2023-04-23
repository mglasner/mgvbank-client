import Head from "next/head";
import Layout from "../../components/layout";
import Card from "../../components/card";
import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

export default function History() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState({});
  const [rows, setRows] = useState([]);
  const [balance, setBalance] = useState(0);

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
        setUser(userData);
        setBalance(
          userData.history.reduce(
            (acc, transaction) => acc + transaction.amount,
            0
          )
        );
        setRows(
          userData.history.map((transaction, idx) => {
            return (
              <>
                <tr key={idx} className="table-dark">
                  <td>{idx + 1}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                </tr>
              </>
            );
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (firebaseUser) {
      fetchUserData();
    }
  }, [firebaseUser]);

  const rows2 = () => {
    user.history.map((value, idx) => {
      return (
        <>
          <tr key={idx} className="table-dark">
            <td>{idx}</td>
            <td>{"deposit"}</td>
            <td>{value}</td>
          </tr>
        </>
      );
    });
  };

  return (
    <Layout>
      <Head>
        <title>transaction history</title>
      </Head>
      <Card
        header={`Balance: $${balance}`}
        bgcolor="dark"
        title="Transaction History"
        body={
          <table className="table table-striped table-hover">
            <thead>
              <tr className="table-dark">
                <th>#</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        }
      ></Card>
    </Layout>
  );
}
