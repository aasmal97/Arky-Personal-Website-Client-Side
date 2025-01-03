import axios from "axios";
import { GithubRepoData, ErrorObject, EventData } from "../types/GithubTypes";
export const getGithubApiData = async (
  route: string,
  params: {
    [key: string]: any;
  }
): Promise<GithubRepoData | ErrorObject> => {
  try {
    const request = await axios({
      method: "get",
      url: `https://api.github.com/${route}`,
      params: params,
    });
    return request.data;
  } catch (e) {
    return {
      err: true,
      message: "Something went wrong with Github API",
    };
  }
};
export const getPast90DaysContributons = async (): Promise<
  EventData | ErrorObject
> => {
  const events: EventData = [];
  let page = 0;
  let data: EventData | null = null;
  try {
    while (!data || data.length >= 100) {
      const url = `https://api.github.com/users/aasmal97/events`;
      const response = await axios({
        method: "get",
        url: url,
        params: { per_page: 100, page: page++ },
      });
      data = response.data;
      if (data) events.push(...data);
    }
    return events;
  } catch (e) {
    console.error(e);
    return {
      err: true,
      message: "Something went wrong with Github API",
    };
  }
};
export const getHistoricalContributions = async (
  route: string,
  params: {
    [key: string]: any;
  }
): Promise<any[] | ErrorObject> => {
  try {
    const request = await axios({
      method: "get",
      url: `${process.env.REACT_APP_REST_API_URL}/${route}`,
      params: params,
    });
    return request.data;
  } catch (e) {
    return {
      err: true,
      message: "Something went wrong with Github API",
    };
  }
};
