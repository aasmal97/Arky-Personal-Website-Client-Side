import { QueryCommandOutput } from "@aws-sdk/client-dynamodb";
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
