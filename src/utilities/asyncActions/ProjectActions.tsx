import axios from "axios";
import {
  ProjectDocument,
  ProjectFetchData,
  ProjectQueryProps,
} from "../types/RestApiTypes";
import { PaginationProps } from "../pagination/types";
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

export const paginateProjectData = async (
  props: PaginationProps & Partial<ProjectQueryProps>
): Promise<{
  items: ProjectDocument[];
  newStartKey?: string | null;
} | null> => {
  const { cursor, take } = props;
  const query: Partial<PaginationProps & Partial<ProjectQueryProps>> = {
    ...props,
  };
  delete query.cursor;
  delete query.take;
  try {
    const projectWithKeyPromise = {
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
        startKey: cursor,
        max: take,
      },
    });
    const [projectWithKey, projectList] = await Promise.all([
      projectWithKeyPromise,
      projectListPromise,
    ]);
    const docWithKey = projectWithKey.data as unknown as ProjectFetchData;
    const castData = projectList.data as ProjectFetchData;
    const newData = {
      ...castData,
      result: {
        ...castData.result,
        Items: [...docWithKey.result.Items, ...castData.result.Items],
      },
    };
    return {
      items: newData.result.Items,
      newStartKey: JSON.stringify(newData.result.LastEvaluatedKey),
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};
