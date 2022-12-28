import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Layout/Footer";
import { Provider } from "../context";
import Header from "../components/Layout/Header";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
