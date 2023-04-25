import { Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import Navbar from "./utilities/navbar/Navbar";
import Footer from "./utilities/footer/Footer";

const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </>
  );
};
export default Root;
