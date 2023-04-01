import axios from "axios";
import { HobbiesFetchData, HobbiesQueryProps } from "../types/RestApiTypes";
export const fetchHobbiesData = async ({
  query,
  max,
  lastEvaluatedKey,
}: {
  query: HobbiesQueryProps;
  max: number;
  lastEvaluatedKey?: string | null;
}): Promise<HobbiesFetchData | undefined> => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_REST_API_URL}/hobbies`,
      params: {
        query: query,
        lastEvaluatedKey,
        max,
      },
    });
    return data as HobbiesFetchData;
  } catch (e) {
    console.error(e);
  }
};
