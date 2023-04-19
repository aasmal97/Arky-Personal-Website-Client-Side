import axios from "axios";
import { validate } from "email-validator";
export type ContactMeInputProps = {
  sender: string;
  subject: string;
  message: string;
  type?: "phone" | "email";
};
export const postContactMeMessage = async ({
  subject,
  contact,
  content,
}: {
  subject: string;
  contact: string;
  content: string;
}) => {
  const sendType = validate(contact) ? "email" : "phone";
  const data = {
    subject,
    sender: contact,
    message: content,
    type: sendType,
  };
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_REST_API_URL}/contact`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response.data;
};
