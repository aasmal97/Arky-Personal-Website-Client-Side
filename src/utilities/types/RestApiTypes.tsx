import { QueryCommandOutput } from "@aws-sdk/client-dynamodb";
import { z } from "zod";
import parsePhoneNumber, { AsYouType } from "libphonenumber-js";

export type Image = {
  pk: {
    googleResourceId: string;
    documentId: string;
  };
  id: string;
  documentId: string;
  imgDescription: string;
  imgURL: string;
  placeholderURL?: string;
  width?: number;
  height?: number;
  googleResourceId?: string;
  name?: string;
};
export type Skills = {
  recordType: string;
  name: string;
  date_created?: string;
  order?: string;
};
export type ProjectDocument = {
  pk: {
    recordType: "projects";
    dateCreated: string;
    startDate: string;
  };
  recordType: "projects";
  id: string;
  appURL?: string;
  images?: Image[];
  projectName: string;
  githubURL: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  dateCreated: string;
  topics?: string[];
  archived?: boolean;
  repoOwner?: string;
};
export type HobbiesDocument = {
  pk: {
    orientation: string;
    dateCreated: string;
  };
  recordType: string;
  id: string;
  name: string;
  imgDescription: string;
  imgURL: string;
  googleResourceId: string;
  placeholderURL: any;
  width: number;
  height: number;
  dateCreated: string;
  orientation: string;
};
export type GeneralFetchData = {
  message: string;
  result: Omit<QueryCommandOutput, "$metadata" | "Items">;
};
export type SkillsFetchData = GeneralFetchData & {
  result: {
    Items: Skills[];
  };
};
export type HobbiesFetchData = GeneralFetchData & {
  result: { Items: HobbiesDocument[] };
};
export type ProjectFetchData = GeneralFetchData & {
  result: { Items: ProjectDocument[] };
};
export type ProjectQueryProps = {
  recordType: "projects";
  startDate?: string;
  id?: string;
  appURL?: string;
  projectName?: string;
  description?: string;
  sortBy?: {
    startDate?: 1 | -1;
    endDate?: 1 | -1;
  };
};
export type HobbiesQueryProps = {
  id?: string;
  name?: string;
  imgDescription?: string;
  orientation: "vertical" | "horizontal";
  sortBy?: {
    dateCreated?: 1 | -1;
    dateTaken?: 1 | -1;
  };
};

export function isOnlyCountryCode(number: string) {
  const currNumber = new AsYouType();
  currNumber.input(number);
  const nationalNumber = currNumber.getNationalNumber();
  const result = nationalNumber.length > 0;
  return !result;
}
export const ContactFormNameSchema = z.string().min(1, { message: "Name is required" });
export const ContactFormSubjectSchema=z.string().min(1,{message:"Subject is required"})
export const ContactFormPhoneSchema = z
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
export const ContactFormEmailSchema = z.string().email({ message: "Invalid email address" });
export const ContactFormMessageSchema = z
  .string()
  .min(10, { message: "Message should be >10 charaters long" });
export const ContactFormSchema = z
  .object({
    name: ContactFormNameSchema,
    email: ContactFormEmailSchema,
    phone: ContactFormPhoneSchema,
    contact_message_content: ContactFormMessageSchema,
    subject:ContactFormSubjectSchema
  })
  .refine(
    (arg) => {
      return arg.email || arg.phone;
    },
    {
      message: "Either email or phone number is required",
    }
);
  export type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;