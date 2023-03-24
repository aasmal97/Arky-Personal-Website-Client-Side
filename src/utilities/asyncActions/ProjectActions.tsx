import axios from "axios";
export type ProjectCardProps = {
  imgDescription?: string;
  appURL?: string;
  imgURL: string;
  placeholderURL: string;
  projectName?: string;
  githubURL?: string;
  id: string;
  description?: string;
  startDate?: Date | string;
  endDate?: Date | string;
};
export type ProjectFetchData = {
  data: ProjectCardProps[];
  // numberPerFetch: number;
  // collectionCount: number;
};
export const fetchProjectData = async (
  query: { [key: string]: any },
  max: number,
  lastEvaluatedKey?: string | null
): Promise<ProjectFetchData | undefined> => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_AWS_GATEWAY_API}/projects`,
      params: {
        query: query,
        lastEvaluatedKey,
        max,
      },
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};
