import axios from "axios";
import {
  ProjectDocument,
  ProjectFetchData,
  ProjectQueryProps,
} from "../types/RestApiTypes";
export const fetchProjectData = async ({
  query,
  max,
  lastEvaluatedKey,
  action,
}: {
  query: ProjectQueryProps;
  max: number;
  lastEvaluatedKey?: string | null;

  action?: {
    type: "prev" | "next";
    keyToInclude: ProjectDocument["pk"];
  };
}): Promise<ProjectFetchData | null> => {
  try {
    const projectWithKeyPromise =
      action?.type === "prev"
        ? axios({
            method: "get",
            url: `${process.env.REACT_APP_REST_API_URL}/projects`,
            params: {
              query: JSON.stringify({
                ...query,
                recordType: action?.keyToInclude.recordType,
                startDate: action?.keyToInclude.startDate,
              }),
              max: 1,
            },
          })
        : {
            data: {
              result: {
                Items: [],
              },
            },
          };
    const projectListPromise = axios({
      method: "get",
      url: `${process.env.REACT_APP_REST_API_URL}/projects`,
      params: {
        query: JSON.stringify({
          ...query,
        }),
        startKey: JSON.stringify(lastEvaluatedKey),
        max: action?.type === "prev" ? max - 1 : max,
      },
    });
    const [projectWithKey, projectList] = await Promise.all([
      projectWithKeyPromise,
      projectListPromise,
    ]);
    const docWithKey = projectWithKey.data as ProjectFetchData;
    const castData = projectList.data as ProjectFetchData;
    const newData = {
      ...castData,
      result: {
        ...castData.result,
        Items: [...docWithKey.result.Items, ...castData.result.Items],
      },
    };
    return newData;
  } catch (e) {
    console.error(e);
    return null;
  }
};
