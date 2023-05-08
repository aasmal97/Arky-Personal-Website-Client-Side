import useElementSize, { Size } from "../../../../hooks/useElementSize";
import useWindowWidth from "../../../../hooks/useWindowWidth";
import { useEffect, useState } from "react";
import anime from "animejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import useIntersectionWrapper from "../../../../hooks/useIntersectionWrapper";
import { postContactMeMessage } from "../../../../utilities/asyncActions/ContactMeActions";
import {  LoadingButton } from "@mui/lab";
import { LoadingIconRegularCircle } from "../../../../utilities/loadingIcon/LoadingIcon";
import { createPortal, unstable_batchedUpdates } from "react-dom";
import { FormInput } from "../../../../utilities/formInputs/FormInputs";
import { capitalizeFirstLetter } from "../../../../utilities/helpers/capitalizeFirstLetter";
import {
  Alert,
  AlertTitle,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const animationProgess = 88;
const namespace = "contact-me-banner";
const materialUITheme = createTheme({
  palette: {
    primary: {
      main: "#b2292c",
    },
    secondary: {
      main: "#00658a",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
const MessageBoxLine = ({
  setRef,
  size,
  playAnimation = true,
}: {
  playAnimation?: boolean;
  setRef?: (node: HTMLDivElement | null) => void;
  size: Size;
}) => {
  const { ref: boxRef, isVisible } = useIntersectionWrapper();
  useEffect(() => {
    const path = anime.path(`#${namespace}-box-svg path`);
    const target = `#${namespace}-box-email-icon`;
    const animation = anime({
      targets: target,
      translateX: path("x"),
      translateY: path("y"),
      easing: "easeInOutQuad",
      duration: 4000,
      loop: false,
      update: (e) => {
        if (e.progress <= animationProgess) return;
        else {
          animation.pause();
          animation.seek(4000 * (animationProgess / 100));
        }
      },
    });
    animation.seek(0);
    if (!isVisible || !playAnimation) animation.pause();
    else animation.play();
    return () => {
      anime.remove(`#${namespace}-box-email-icon`);
    };
  }, [isVisible, playAnimation]);
  useEffect(() => {
    const path = anime.path(`#${namespace}-box-svg path`);
    const target = `#${namespace}-box-email-icon`;
    const animation = anime({
      targets: target,
      translateX: path("x"),
      translateY: path("y"),
      easing: "easeInOutQuad",
      duration: 4000,
      loop: false,
      update: (e) => {
        if (e.progress <= animationProgess) return;
        else {
          animation.pause();
          animation.seek(4000 * (animationProgess / 100));
        }
      },
    });
    //so that it resizes properly
    animation.seek(0);
    if (!isVisible || !playAnimation) animation.pause();
    else {
      animation.play();
      animation.seek(4000 * (animationProgess / 100));
      animation.pause();
    }
    return () => anime.remove(`#${namespace}-box-email-icon`);
  }, [isVisible, size.height, size.width, playAnimation]);
  return (
    <div
      ref={(e) => {
        if (setRef) setRef(e);
        boxRef.current = e;
      }}
      className={`${namespace}-box-line`}
    >
      <div id={`${namespace}-box-email-icon`}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </div>
      <svg
        id={`${namespace}-box-svg`}
        viewBox="0 0 262 189"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6774 188C34.7012 142.053 56.7303 6.15691 16.6774 1.28047C-7.35416 -1.6453 -0.845672 19.1607 16.6774 24.579C32.041 30.8005 249.875 8.05286 261 1.28047"
          stroke="#909090"
        />
      </svg>
    </div>
  );
};
const ContactFormInput = () => {
  const [contactType, setContactType] = useState("email");
  return (
    <div className={`${namespace}-contact-form-input`}>
      {contactType === "phone" && (
        <PhoneInput
          containerClass="phone-input-container"
          inputClass="phone-input"
          inputProps={{
            name: "message_contact",
            required: true,
          }}
          dropdownClass="phone-dropdown"
          placeholder="Your Phone Number"
        />
      )}
      {contactType === "email" && (
        <FormInput
          className={`${namespace}-contact-form-input-email`}
          name="message_contact"
          inputType="text"
          placeholder="Your Email"
        />
      )}
      <ThemeProvider theme={materialUITheme}>
        <ToggleButtonGroup
          orientation="horizontal"
          value={contactType}
          color="primary"
          exclusive
          onChange={(e, value) => {
            if (value) setContactType(value);
          }}
        >
          <ToggleButton color="secondary" value={"email"} aria-label="email">
            <FontAwesomeIcon icon={faEnvelope} />
          </ToggleButton>
          <ToggleButton value={"phone"} aria-label="phone">
            <FontAwesomeIcon icon={faPhone} />
          </ToggleButton>
        </ToggleButtonGroup>
      </ThemeProvider>
    </div>
  );
};
export const MessageBox = () => {
  const [setRef, size] = useElementSize();
  const [formStatus, setFormStatus] = useState<"loading" | "error" | "success">(
    "success"
  );
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [playAnimation, setPlayAnimation] = useState(false);
  const smallWindowWidth = useWindowWidth(992);
  const smallestWindowWidth = useWindowWidth(575)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === "loading") return;
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { message_subject, message_contact, message_content } = data;
    if (message_subject && message_contact && message_content) {
      setFormStatus("loading");
      //we do both so that we reset position of animation
      setPlayAnimation(true);
      postContactMeMessage({
        subject: message_subject.toString(),
        contact: message_contact.toString(),
        content: message_content.toString(),
      })
        .then((e) => {
          unstable_batchedUpdates(() => {
            setFormMessage(e);
            setFormStatus("success");
            setTimeout(() => {
              setFormMessage(null);
            }, 10000);
          });
        })
        .catch((err) => {
          console.error(err.response.data);
          unstable_batchedUpdates(() => {
            setFormMessage(err.response.data);
            setFormStatus("error");
          });
        });
    }
  };

  const formMessageBanner = createPortal(
    <Alert
      style={{
        zIndex: 9999,
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        boxSizing: "border-box",
      }}
      variant="filled"
      onClose={() => setFormMessage(null)}
      severity={formStatus === "success" ? "success" : "error"}
    >
      <AlertTitle>{capitalizeFirstLetter(formStatus)}</AlertTitle>
      {formMessage && formMessage}
    </Alert>,
    document.body
  );
  const paddingLeft = 23;
  const paddingTop = 17; 
  const formHeight = smallestWindowWidth ? size.height * 1.2 : size.height * 1.35; 
  return (
    <div id={`${namespace}-message`}>
      {formStatus !== "loading" && formMessage && formMessageBanner}

      <div id={`${namespace}-message-inner`}>
        <MessageBoxLine
          setRef={setRef}
          size={size}
          playAnimation={playAnimation}
        />

        <form
          onSubmit={onSubmit}
          id={`${namespace}-message-form`}
          style={{
            paddingTop: `${paddingTop}%`,
            paddingLeft: `${paddingLeft}%`,
            height: `calc(${formHeight}px - (${size.width}px * ${
              paddingTop / 100
            }))`,
            width: `calc(${size.width}px - (${size.width}px * ${
              paddingLeft / 100
            }))`,
          }}
        >
          <ContactFormInput />
          <div id={`${namespace}-message-form-inner`}>
            <FormInput
              name="message_subject"
              inputType="text"
              placeholder="Subject"
            />
            <FormInput
              placeholder={"Message"}
              name="message_content"
              inputType="textarea"
            />
          </div>
          <LoadingButton
            type="submit"
            loading={formStatus === "loading"}
            loadingIndicator={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "70%",
                  width: "100%",
                }}
              >
                <LoadingIconRegularCircle
                  color="white"
                  style={{ height: "100%" }}
                />
              </div>
            }
            variant="outlined"
          >
            Send
          </LoadingButton>
        </form>
        <div
          id={`${namespace}-message-urgent`}
          style={{
            width: smallWindowWidth ? `calc(100% - ${paddingLeft}%)` : "100%",
          }}
        >
          For urgent requests contact me at <br />
          347-424-3939
        </div>
      </div>
    </div>
  );
};
