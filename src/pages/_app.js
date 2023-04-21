import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import initAuth from "../initAuth";

initAuth();

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <Component {...pageProps} />;
}

