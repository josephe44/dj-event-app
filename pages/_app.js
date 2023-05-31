import { ToastContainer, toast } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer position="top-center" autoClose={2000} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
