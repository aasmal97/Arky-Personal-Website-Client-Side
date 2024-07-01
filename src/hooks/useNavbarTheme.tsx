import { createContext, useContext, useState } from "react";
export type NavbarTheme = "dark" | "light";

const NavbarThemeContext = createContext<{
  currTheme: NavbarTheme;
  setCurrTheme: React.Dispatch<React.SetStateAction<NavbarTheme>> | null;
}>({
  currTheme: "dark",
  setCurrTheme: null,
});
export const NavbarThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currTheme, setCurrTheme] = useState<NavbarTheme>("dark");

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
    return context
};
