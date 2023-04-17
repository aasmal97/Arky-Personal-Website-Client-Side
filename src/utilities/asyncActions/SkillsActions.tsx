import { SkillsFetchData } from "../types/RestApiTypes";
import axios from "axios";
export const fetchSkillsData = async ({
  query,
  max,
  lastEvaluatedKey,
}: {
  query: {};
  max: number;
  lastEvaluatedKey?: string | null;
}) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_REST_API_URL}/skills`,
      params: {
        query: JSON.stringify({
          ...query,
        }),
        max: max,
        lastEvaluatedKey,
      },
    });
    return data as SkillsFetchData;
  } catch (err) {
    console.error(err);
    return null;
  }
};
