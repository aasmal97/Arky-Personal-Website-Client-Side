import { Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import Navbar from "./utilities/navbar/Navbar";
import Footer from "./utilities/footer/Footer";

const Root = () => {
  return (
    <>
      <Navbar />
      <div id="app-container">
        <Outlet />
        <ScrollRestoration />
      </div>
      <Footer />
    </>
  );
};
export default Root;
