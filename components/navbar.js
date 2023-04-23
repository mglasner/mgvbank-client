import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);
export default function Navbar() {
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  const handleLogOut = async function () {
    try {
      let result = await signOut(auth);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <Image
              src="/images/bank.svg"
              height={60}
              width={60}
              alt="bank logo"
              priority
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={`nav-item ${user ? "" : "d-none"}`}>
                <Link
                  className={`nav-link ${
                    router.pathname === "/deposit" ? "active" : ""
                  }`}
                  href="/deposit"
                >
                  Deposit
                </Link>
              </li>
              <li className={`nav-item ${user ? "" : "d-none"}`}>
                <Link
                  className={`nav-link ${
                    router.pathname === "/withdraw" ? "active" : ""
                  }`}
                  href="/withdraw"
                >
                  Withdraw
                </Link>
              </li>
              <li className={`nav-item ${user ? "" : "d-none"}`}>
                <Link
                  className={`nav-link ${
                    router.pathname === "/transfer" ? "active" : ""
                  }`}
                  href="/transfer"
                >
                  Transfer
                </Link>
              </li>
              <li className={`nav-item ${user ? "" : "d-none"}`}>
                <Link
                  className={`nav-link ${
                    router.pathname === "/history" ? "active" : ""
                  }`}
                  href="/history"
                >
                  Transaction History
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className={`nav-item ${user ? "d-none" : ""}`}>
                <Link
                  className={`nav-link ${
                    router.pathname === "/login" ? "active" : ""
                  }`}
                  href="/login"
                >
                  Login
                  <Image
                    src="/images/log-in.svg"
                    height={20}
                    width={20}
                    alt="bank logo"
                  />
                </Link>
              </li>
              <li className={`nav-item ${user ? "d-none" : ""}`}>
                <Link
                  className={`nav-link ${
                    router.pathname === "/signup" ? "active" : ""
                  }`}
                  href="/signup"
                >
                  Signup
                  <Image
                    src="/images/sign-up.svg"
                    height={20}
                    width={20}
                    alt="bank logo"
                  />
                </Link>
              </li>
              <li className={`nav-item ${user ? "" : "d-none"}`}>
                <Link className="nav-link" href="#">
                  {user ? user.email : ""}
                </Link>
              </li>
              <li className={`nav-item ${user ? "" : "d-none"}`}>
                <Link className="nav-link" href="#" onClick={handleLogOut}>
                  Logout
                  <Image
                    src="/images/log-out.svg"
                    height={20}
                    width={20}
                    alt="bank logo"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
