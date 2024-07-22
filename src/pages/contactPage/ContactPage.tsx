import { TextField, createTheme, ThemeProvider } from "@mui/material";
import { ArrowOutward } from "@mui/icons-material";
import { IntroBannerImage } from "./IntroBannerImage";
import ActionBtn from "../../utilities/actionBtn/ActionBtn";
import useWindowWidth from "../../hooks/useWindowWidth";

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
const ContactFormWrapper = ({ children }: { children: React.ReactNode }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form id={`${namespace}-form`} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
const ContactForm = () => {
  const largeWindowWidth = useWindowWidth(1200);
  const mediumWindowWidth = useWindowWidth(992);
  const smallWindowWidth = useWindowWidth(768);

  return (
    <ContactFormWrapper>
      <div className={`${namespace}-contact-form-header`}>
        <h3>Contact</h3>
        <p>Let’s bring an awesome project to reality!</p>
      </div>
      <TextField
        id="standard-basic"
        label="Name"
        variant="standard"
        fullWidth
      />
      <div className={`${namespace}-contact-form-row`}>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          fullWidth
        />
        <TextField
          id="standard-basic"
          label="Phone"
          variant="standard"
          fullWidth
        />
      </div>
      <TextField
        id="standard-basic"
        label="Message"
        variant="standard"
        multiline
        fullWidth
        rows={largeWindowWidth ? 8 : mediumWindowWidth ? 5 : smallWindowWidth ? 5 : 6}
      />
      <ActionBtn
        props={{
          type: "submit",
          "aria-label": "Send Message",
          className: `${namespace}-contact-form-btn`,
        }}
      >
        Send Message
      </ActionBtn>
    </ContactFormWrapper>
  );
};
const ContactDescription = () => {
  return (
    <div id={`${namespace}-content`}>
      <div className={`${namespace}-content-row`}>
        <div className={`${namespace}-content-col`}>
          <h4>Email</h4>
          <a
            href="mailto:arkyasmal@gmail.com"
            className={`${namespace}-content-email-link`}
          >
            arkyasmal@gmail.com
          </a>
        </div>
        <div className={`${namespace}-content-col`}>
          <h4>Resume</h4>
          <a
            className={`${namespace}-content-resume-link`}
            href={`${process.env.REACT_APP_MEDIA_FILES_URL}/homePg/ArkyAsmalCV.pdf`}
            target="_blank"
          >
            <div>View Resume</div>
            <ArrowOutward />
          </a>
        </div>
      </div>
      <div className={`${namespace}-content-row`}>
        <div className={`${namespace}-content-img`}>
          <IntroBannerImage />
        </div>
      </div>
    </div>
  );
};
const ContactPage = () => {
  return (
    <ThemeProvider theme={materialUITheme}>
      <div id={`${namespace}`}>
        <div id={`${namespace}-inner`}>
          <ContactDescription />
          <ContactForm />
        </div>
      </div>
    </ThemeProvider>
  );
};
export default ContactPage;
