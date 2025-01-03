import { createContext, useContext, useState } from "react";
export type NavbarTheme = "dark" | "color";

const NavbarThemeContext = createContext<{
  currTheme: NavbarTheme;
  setCurrTheme: React.Dispatch<React.SetStateAction<NavbarTheme>> | null;
}>({
  currTheme: "dark",
  setCurrTheme: null,
});
export const NavbarThemeProvider = ({
  defaultTheme = "dark",
  children,
}: {
  defaultTheme?: NavbarTheme;
  children: React.ReactNode;
}) => {
  const [currTheme, setCurrTheme] = useState<NavbarTheme>(defaultTheme);
  return (
    <NavbarThemeContext.Provider
      value={{
        currTheme,
        setCurrTheme,
      }}
    >
      {children}
    </NavbarThemeContext.Provider>
  );
};
export const useNavbarTheme = () => {
  const context = useContext(NavbarThemeContext);
  return context;
};
