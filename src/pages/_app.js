import { GlobalProvider } from "@/context/GlobalProvider";
import "@/styles/globals.css";
import "@material/web/common.js";
import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap css

import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, [])

  return <>
    <GlobalProvider>
      <Component {...pageProps} />;
    </GlobalProvider>
  </>
}
