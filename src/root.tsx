import { Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import Navbar from "./utilities/navbar/Navbar";
import Footer from "./utilities/footer/Footer";
import { NavbarThemeProvider } from "./hooks/useNavbarTheme";

const Root = () => {
  return (
    <>
      <NavbarThemeProvider>
        <Navbar />
        <div id="app-container">
          <Outlet />
          <ScrollRestoration />
        </div>
        <Footer />
      </NavbarThemeProvider>
    </>
  );
};
export default Root;
