import axios from "axios";
export type HobbiesProps = {
  pk: {
    orientation: string;
    dateCreated: string;
  };
  recordType: string;
  id: string;
  name: string;
  imgDescription: string;
  imgURL: string;
  placeholderURL: any;
  width: number;
  height: number;
  dateCreated: string;
  orientation: string;
};
export type HobbiesFetchData = {
  data: HobbiesProps[];
  //   numberPerFetch: number;
  //   collectionCount: number;
};
export const fetchHobbiesData = async (
  query: { [key: string]: any },
  max: number,
  lastEvaluatedKey?: string | null
): Promise<HobbiesFetchData | undefined> => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_AWS_GATEWAY_API}/hobbies`,
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
