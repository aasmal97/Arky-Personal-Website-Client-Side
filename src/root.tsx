import React from "react";
import { Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";

const Navbar = React.lazy(() => import("./utilities/navbar/Navbar"));
const Footer = React.lazy(() => import("./utilities/footer/Footer"));
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
