import { TextField, Alert, AlertTitle } from "@mui/material";
import ActionBtn from "../../utilities/actionBtn/ActionBtn";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useState } from "react";
import { MuiTelInput } from "mui-tel-input";
import { useFormStatus } from "../../hooks/useFormStatus";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { useFormInputValidation } from "../../hooks/useFormInputValidation";
import { postContactMeMessage } from "../../utilities/asyncActions/ContactMeActions";
import {
  ContactFormEmailSchema,
  ContactFormMessageSchema,
  ContactFormNameSchema,
  ContactFormPhoneSchema,
  ContactFormSchema,
  ContactFormSubjectSchema,
} from "../../utilities/types/RestApiTypes";
const namespace = "contact-pg";

const ContactFormWrapper = ({ children }: { children: React.ReactNode }) => {
  const { formStatus, setFormStatus, setFormMessage } = useFormStatus();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!setFormMessage || !setFormStatus) return;
    if (formStatus === "loading") return;
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const result = ContactFormSchema.safeParse(data);
    if (result.error) {
      setFormStatus("error");
      setFormMessage(result.error.errors[0].message);
      return;
    }
    const parsedData = result.data;
    const { name, email, phone, subject, contact_message_content } = parsedData;
    const messageResult = await postContactMeMessage({
      name,
      email,
      phone,
      subject,
      contact_message_content,
    });
    if (messageResult?.error) {
      setFormStatus("error");
      setFormMessage(messageResult?.data);
    } else {
      setFormStatus("success");
      setFormMessage("Message Successfully Sent!");
    }
  };
  return (
    <form id={`${namespace}-form`} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

const ContactFormErrorMessageContainer = () => {
  const { formStatus, formMessage, setFormMessage } = useFormStatus();
  if (!formMessage) return <></>;
  return (
    <Alert
      style={{
        width: "100%",
        boxSizing: "border-box",
      }}
      variant="filled"
      onClose={() => {
        if (setFormMessage) setFormMessage(null);
      }}
      severity={formStatus === "success" ? "success" : "error"}
    >
      <AlertTitle>
        {capitalizeFirstLetter(formStatus) + formStatus === "error"
          ? ": Could not send"
          : ""}
      </AlertTitle>
      {formMessage && formMessage}
    </Alert>
  );
};
const ContactFormNameFormInput = () => {
  const [name, setName] = useState("");
  const { validateSchema, helperText, error } = useFormInputValidation(
    ContactFormNameSchema
  );
  return (
    <TextField
      error={error}
      helperText={helperText}
      value={name}
      onBlur={() => validateSchema(name)}
      onChange={(e) => setName(e.target.value)}
      id="name"
      name="name"
      label="Name"
      variant="standard"
      fullWidth
    />
  );
};

const ContactFormEmailInput = () => {
  const [email, setEmail] = useState("");
  const { validateSchema, helperText, error } = useFormInputValidation(
    ContactFormEmailSchema
  );
  return (
    <TextField
      error={error}
      helperText={helperText}
      value={email}
      onBlur={() => validateSchema(email)}
      onChange={(e) => setEmail(e.target.value)}
      id="email"
      name="email"
      label="Email"
      variant="standard"
      fullWidth
    />
  );
};
const ContactFormPhoneInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { validateSchema, helperText, error } = useFormInputValidation(
    ContactFormPhoneSchema
  );
  return (
    <MuiTelInput
      error={error}
      helperText={helperText}
      id="phone"
      name="phone"
      label="Phone"
      variant="standard"
      fullWidth
      value={phoneNumber}
      defaultCountry="US"
      onBlur={() => validateSchema(phoneNumber)}
      onChange={(val) => setPhoneNumber(val)}
    />
  );
};
const ContactFormSubjectFormInput = () => {
  const [subject, setSubject] = useState("");
  const { validateSchema, helperText, error } = useFormInputValidation(
    ContactFormSubjectSchema
  );
  return (
    <TextField
      error={error}
      helperText={helperText}
      value={subject}
      onBlur={() => validateSchema(subject)}
      onChange={(e) => setSubject(e.target.value)}
      id="subject"
      name="subject"
      label="Subject"
      variant="standard"
      fullWidth
    />
  );
};
const ContactFormMessageInput = () => {
  const largeWindowWidth = useWindowWidth(1200);
  const mediumWindowWidth = useWindowWidth(992);
  const smallWindowWidth = useWindowWidth(768);
  const [message, setMessage] = useState("");
  const { validateSchema, helperText, error } = useFormInputValidation(
    ContactFormMessageSchema
  );
  return (
    <TextField
      error={error}
      helperText={helperText}
      value={message}
      onBlur={() => validateSchema(message)}
      onChange={(e) => setMessage(e.target.value)}
      id="contact_message_content"
      name="contact_message_content"
      label="Message"
      variant="standard"
      multiline
      fullWidth
      rows={
        largeWindowWidth ? 7 : mediumWindowWidth ? 5 : smallWindowWidth ? 5 : 7
      }
    />
  );
};
const ContactForm = () => {
  return (
    <ContactFormWrapper>
      <div className={`${namespace}-contact-form-header`}>
        <h3>Contact</h3>
        <p>Let’s bring an awesome project to reality!</p>
      </div>
      <ContactFormErrorMessageContainer />
      <ContactFormNameFormInput />
      <div className={`${namespace}-contact-form-row`}>
        <ContactFormEmailInput />
        <ContactFormPhoneInput />
      </div>
      <ContactFormSubjectFormInput />

      <ContactFormMessageInput />
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
export default ContactForm;
