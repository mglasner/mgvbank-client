import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" href="/">
              <Image
                src="/images/bank.svg"
                height={60}
                width={60}
                alt="bank logo"
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      router.pathname === "/deposit" ? "active" : ""
                    }`}
                    href="/deposit"
                  >
                    Deposit
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      router.pathname === "/withdraw" ? "active" : ""
                    }`}
                    href="/withdraw"
                  >
                    Withdraw
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
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
                <li className="nav-item">
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
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="container">{children}</div>
    </>
  );
}
