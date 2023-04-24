import Head from "next/head";
import Layout from "../../components/layout";
import Card from "../../components/card";
import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { useRouter } from "next/navigation";

const auth = getAuth(firebase_app);

export default function History() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [rows, setRows] = useState([]);
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
        const response = await fetch(`${apiURL}/email/${firebaseUser.email}`);
        const userData = await response.json();
        setBalance(
          userData.history.reduce(
            (acc, transaction) => acc + transaction.amount,
            0
          )
        );
        setRows(
          userData.history.map((transaction, idx) => {
            return (
              <tr key={idx} className="table-dark">
                <td>{idx + 1}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.from || transaction.to || ""}</td>
              </tr>
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
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <caption>history</caption>
              <thead>
                <tr className="table-dark">
                  <th>#</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>From / To</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        }
      ></Card>
    </Layout>
  );
}
