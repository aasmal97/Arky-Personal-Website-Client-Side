import { NavbarThemeProvider } from "../components/hooks/useNavbarTheme";
import Navbar from "../components/utilities/navbar/Navbar";
import CircleBg from "../components/utilities/circleBg/CircleBg";
import Footer from "../components/utilities/footer/Footer";
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavbarThemeProvider>
      <Navbar />
      <CircleBg />
          <div id="app-container">
              
              {children}
            </div>
      <Footer />
    </NavbarThemeProvider>
  );
};
export default AppLayout;
