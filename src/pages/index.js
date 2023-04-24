import Head from "next/head";
import Layout from "../../components/layout";
import Card from "../../components/card";
import Link from "next/link";

import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);
export default function Home() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState({});
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, [firebaseUser]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiURL}/email/${firebaseUser.email}`);
        const userData = await response.json();
        setUser(userData);
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

  return (
    <Layout>
      <Head>
        <title>mgvbank</title>
      </Head>
      <Card
        header="MGVBANK"
        title={
          firebaseUser
            ? `Hi ${user.name}, your current balance si $${balance}`
            : "¡Welcome!"
        }
        text={firebaseUser ? `Your shortcuts:` : ""}
        body={
          firebaseUser ? (
            <>
              <Link className="" href="/deposit">
                Deposit 💰
              </Link>
              <br />
              <Link className="" href="/deposit">
                Withdraw 💸
              </Link>
              <br />
              <Link className="" href="/transfer">
                Transfer 📤
              </Link>
            </>
          ) : (
            <>
              <Link className="" href="/login">
                Log in
              </Link>
              <br />
              <Link className="" href="/signup">
                Create an account
              </Link>
            </>
          )
        }
      />
    </Layout>
  );
}
