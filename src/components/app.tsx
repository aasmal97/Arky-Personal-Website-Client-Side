import {
  NavbarThemeProvider,
  type NavbarTheme,
} from "../components/hooks/useNavbarTheme";
import Navbar from "../components/utilities/navbar/Navbar";
import CircleBg from "../components/utilities/circleBg/CircleBg";
import Footer from "../components/utilities/footer/Footer";
const AppLayout = ({
  defaultTheme,
  children,
}: {
  defaultTheme?: NavbarTheme;
  children: React.ReactNode;
}) => {
  return (
    <NavbarThemeProvider defaultTheme={defaultTheme}>
      <Navbar />
      <CircleBg />
      <div id="app-container">{children}</div>
      <Footer />
    </NavbarThemeProvider>
  );
};
export default AppLayout;
