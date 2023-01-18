import axios from "axios";
export type ProjectCardProps = {
    generalURL?: string;
    appURL?: string;
    imgURL: string;
    placeholderURL: string;
    projectName?: string;
    githubURL?: string;
    id: string;
    description?: string;
  };
  export type ProjectFetchData = {
    data: ProjectCardProps[];
    numberPerFetch: number;
    collectionCount: number;
  };
  export const fetchProjectData = async (
    page: string | number,
    countPerPage: number,
    query?: { [key: string]: string }
  ): Promise<ProjectFetchData | undefined> => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${process.env.REACT_APP_AWS_GATEWAY_API}/projects`,
        params: {
          query: query,
          countPerPage: countPerPage,
          page: page,
        },
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  };