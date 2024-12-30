import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "./utilities/navbar/Navbar";
import Footer from "./utilities/footer/Footer";
import { NavbarThemeProvider } from "./hooks/useNavbarTheme";
import CircleBg from "./utilities/circleBg/CircleBg";

const Root = () => {
  return (
    <>
      <NavbarThemeProvider>
        <Navbar />
        <CircleBg />

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
