import axios from "axios";
export type UserInfo = {
  stackOverflowData: {
    reputation: any;
    peopleReached: any;
  };
  githubData: {
    repositories: any;
    contributions: number;
  };
};
export const getUserInfo = async () => {
  try {
    const request = await axios({
      method: "get",
      url: `${process.env.REACT_APP_REST_API_URL}/userMetrics`,
    });
    return request.data;
  } catch (e) {
    return {
      err: true,
      message: "Something went wrong with Github API",
    };
  }
};
