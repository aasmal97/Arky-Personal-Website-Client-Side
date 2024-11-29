import { createTheme, ThemeProvider } from "@mui/material";
import { useNavbarTheme } from "../../hooks/useNavbarTheme";
import { useEffect } from "react";
import { FormStatusProvider } from "../../hooks/useFormStatus";
import ContactDescription from "./ContactDescription";
import ContactForm from "./ContactForm";

const namespace = "contact-pg";
const materialUITheme = createTheme({
  palette: {
    primary: {
      main: "#ffc83a",
      contrastText: "#6B6B6B",
    },
    secondary: {
      main: "#6B6B6B",
      contrastText: "#ffc83a",
    },
    text: {
      secondary: "#6B6B6B",
    },
  },
  typography: {
    fontFamily: "Lato, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
});
const ContactPage = () => {
  const { setCurrTheme } = useNavbarTheme();
  useEffect(() => {
    if (setCurrTheme) setCurrTheme("dark");
  }, [setCurrTheme]);
  return (
    <ThemeProvider theme={materialUITheme}>
      <div id={`${namespace}`}>
        <div id={`${namespace}-inner`}>
          <ContactDescription namespace={namespace} />
          <FormStatusProvider>
            <ContactForm />
          </FormStatusProvider>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default ContactPage;
