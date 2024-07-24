import axios, { AxiosError } from "axios";
import { validate } from "email-validator";
import { ContactFormSchemaType } from "../types/RestApiTypes";
import { error } from "console";
export type ContactMeInputProps = {
  sender: string;
  subject: string;
  message: string;
  type?: "phone" | "email";
};
export const postContactMeMessage = async ({
  name,
  email,
  contact_message_content,
  phone,
  subject,
}: ContactFormSchemaType) => {
  const sendType = validate(email) ? "email" : "phone";
  const data = {
    sender: {
      name,
      email,
      phone,
    },
    subject: subject,
    message: contact_message_content,
    type: sendType,
  };
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_REST_API_URL}/contact`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    return {
      error: false,
      data: response.data,
    };
  } catch (err) {
    const castErr = err as AxiosError;
    if (castErr.status === 500)
      return {
        error: true,
        data: castErr.message,
      };
  }
};
