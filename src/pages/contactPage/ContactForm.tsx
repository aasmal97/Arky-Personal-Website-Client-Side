import { TextField, Alert, AlertTitle } from "@mui/material";
import ActionBtn from "../../utilities/actionBtn/ActionBtn";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useState } from "react";
import z from "zod";
import { MuiTelInput } from "mui-tel-input";
import parsePhoneNumber, { AsYouType } from "libphonenumber-js";
import { useFormStatus } from "../../hooks/useFormStatus";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { useFormInputValidation } from "../../hooks/useFormInputValidation";
const namespace = "contact-pg";

function isOnlyCountryCode(number: string) {
  const currNumber = new AsYouType();
  currNumber.input(number);
  const nationalNumber = currNumber.getNationalNumber();
  const result = nationalNumber.length > 0;
  return !result;
}
const NameSchema = z.string().min(1, { message: "Name is required" });
const PhoneSchema = z
  .string()
  .transform((arg) => (!isOnlyCountryCode(arg) ? arg : undefined))
  .optional()
  .refine(
    (arg) => {
      if (!arg) return true;
      return parsePhoneNumber(arg)?.isValid();
    },
    {
      message: "Invalid phone number",
    }
  );
const EmailSchema = z.string().email({ message: "Invalid email address" });
const MessageSchema = z
  .string()
  .min(10, { message: "Message should be >10 charaters long" });
const ContactFormSchema = z
  .object({
    name: NameSchema,
    email: EmailSchema,
    phone: PhoneSchema,
    contact_message_content: MessageSchema,
  })
  .refine(
    (arg) => {
      return arg.email || arg.phone;
    },
    {
      message: "Either email or phone number is required",
    }
  );
const ContactFormWrapper = ({ children }: { children: React.ReactNode }) => {
  const { formStatus, setFormStatus, setFormMessage } = useFormStatus();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === "loading") return;
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const result = ContactFormSchema.safeParse(data);
    if (result.error) {
      if (setFormStatus) setFormStatus("error");
      if (setFormMessage) setFormMessage(result.error.errors[0].message);
      return;
    }
    const parsedData = result.data;
    const { name, email, phone, contact_message_content } = parsedData;
    // console.log(result.data);
    // const result = await postContactMeMessage({
    //   subject: message_subject.toString(),
    //   contact: message_contact.toString(),
    //   content: message_content.toString(),
    // });
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
        {capitalizeFirstLetter(formStatus) + ": Could not send"}
      </AlertTitle>
      {formMessage && formMessage}
    </Alert>
  );
};
const ContactFormNameFormInput = () => {
  const [name, setName] = useState("");
  const { validateSchema, helperText, error } =
    useFormInputValidation(NameSchema);
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
  const { validateSchema, helperText, error } =
    useFormInputValidation(EmailSchema);
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
  const { validateSchema, helperText, error } =
    useFormInputValidation(PhoneSchema);
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
const ContactFormMessageInput = () => {
  const largeWindowWidth = useWindowWidth(1200);
  const mediumWindowWidth = useWindowWidth(992);
  const smallWindowWidth = useWindowWidth(768);
  const [message, setMessage] = useState("");
  const { validateSchema, helperText, error } =
    useFormInputValidation(MessageSchema);
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
        largeWindowWidth ? 8 : mediumWindowWidth ? 5 : smallWindowWidth ? 5 : 6
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
