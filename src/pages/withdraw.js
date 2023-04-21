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

function Withdraw() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");
  const [withdraw, setWithdraw] = useState(0);

  const validateWithdraw = function (field) {
    let current_user = findCurrentUser();

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
    if (field >= current_user.balance) {
      setStatus(
        `Maximum amount available to withdraw: $${current_user.balance}`
      );
      setWithdraw(0);
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

  const handleWithdraw = function () {
    if (!validateUser(user)) {
      return;
    }
    if (!validateWithdraw(withdraw)) {
      return;
    }
    let current_user = findCurrentUser();
    current_user.balance -= withdraw / 1;
    current_user.history.unshift({ type: "withdraw", amount: withdraw });
    setShow(false);
  };

  const clearForm = function () {
    setWithdraw(0);
    setUser("");
    setShow(true);
  };

  const findCurrentUser = function () {
    return "mgv";
  };
  return (
    <Layout>
      <Head>
        <title>Withdraw</title>
      </Head>
      <Card
        bgcolor="dark"
        header={`Balance: lorem`}
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

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(() => {
  return {
    props: {},
  };
});

export default withAuthUser()(Withdraw);
