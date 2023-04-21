import { useState } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import Card from "../../components/card";

import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

function Deposit() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");
  const [deposit, setDeposit] = useState(0);

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

  const validateUser = function (field) {
    if (field === "") {
      setStatus("Please select an user from the dropdown menu");
      setUser("");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const handleDeposit = function () {
    if (!validateUser(user)) {
      return;
    }
    if (!validateDeposit(deposit)) {
      return;
    }
    let current_user = findCurrentUser();
    current_user.balance += deposit / 1;
    current_user.history.unshift({ type: "deposit", amount: deposit });
    setShow(false);
  };

  const clearForm = function () {
    setDeposit(0);
    setUser("");
    setShow(true);
  };

  const findCurrentUser = function () {
    return "mgv";
  };

  return (
    <Layout>
      <Head>
        <title>Deposit</title>
      </Head>
      <Card
        header={`Balance: $lorem`}
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
                className={`btn btn-light ${
                  user === "" && deposit === 0 ? "disabled" : ""
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

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(() => {
  return {
    props: {},
  };
});
export default withAuthUser()(Deposit);
