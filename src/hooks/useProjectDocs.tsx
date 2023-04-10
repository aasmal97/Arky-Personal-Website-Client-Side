import { useState, useEffect, useRef } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { unstable_batchedUpdates } from "react-dom";
import {
  ProjectDocument,
  ProjectQueryProps,
} from "../utilities/types/RestApiTypes";
import { fetchProjectData } from "../utilities/asyncActions/ProjectActions";
export type FetchNewDataProps = {
  action?: "prev" | "next";
  query?: string;
  lastEvaluatedKey?: string;
  countPerPage: number;
  setPrevStartKeyIdx: React.Dispatch<React.SetStateAction<number>>;
  setPreviousKeys: React.Dispatch<
    React.SetStateAction<(string | null | undefined)[]>
  >;
  setSlides: React.Dispatch<React.SetStateAction<ProjectDocument[]>>;
  setStartKey: React.Dispatch<React.SetStateAction<string | null>>;
  setQuery: React.Dispatch<React.SetStateAction<string | null>>;
  setStatus: React.Dispatch<
    React.SetStateAction<"loading" | "success" | "failed">
  >;
  navigate?: NavigateFunction;
};
export const decodeSavedParams = (
  query?: string,
  lastEvaluatedKey?: string
) => {
  const key = lastEvaluatedKey;
  const decodedKey = key ? decodeURIComponent(key) : null;
  const decodedQuery = query ? decodeURIComponent(query) : null;
  const parsedKey = decodedKey ? JSON.parse(decodedKey) : null;
  const parsedQuery = decodedQuery ? JSON.parse(decodedQuery) : null;
  return { parsedKey, parsedQuery };
};
export const encodeQuery = (query: ProjectQueryProps) => {
  return encodeURIComponent(JSON.stringify(query));
};
const fetchNewData = ({
  action,
  query,
  lastEvaluatedKey,
  countPerPage,
  setPrevStartKeyIdx,
  setSlides,
  setStartKey,
  setQuery,
  navigate,
  setPreviousKeys,
  setStatus,
}: FetchNewDataProps) => {
  setStatus("loading");
  const { parsedKey, parsedQuery } = decodeSavedParams(query, lastEvaluatedKey);
  fetchProjectData({
    query: parsedQuery,
    lastEvaluatedKey: parsedKey,
    max: countPerPage,
  })
    .then((res) => {
      if (!res) return;
      const newStartKey = res.result.LastEvaluatedKey
        ? encodeURIComponent(JSON.stringify(res.result.LastEvaluatedKey))
        : null;
      unstable_batchedUpdates(() => {
        if (action === "next") {
          setPrevStartKeyIdx((e) => e + 1);
          setPreviousKeys((e) => {
            const newArr = [...e];
            const map: { [key: string]: boolean } = {};
            e.forEach((key) => {
              if (key) map[key] = true;
            });
            if (lastEvaluatedKey && !(lastEvaluatedKey in map))
              newArr.push(lastEvaluatedKey);
            if (newStartKey && !(newStartKey in map)) newArr.push(newStartKey);
            return newArr;
          });
        } else if (action === "prev") {
          setPrevStartKeyIdx((e) => {
            const newNum = e - 1;
            return newNum < 0 ? 0 : newNum;
          });
        }
        setStatus("success");
        setSlides(res.result.Items);
        setStartKey(newStartKey);
        setQuery(query ? query : null);
        if (navigate) navigate(`/projects/${query}`);
      });
    })
    .catch((err) => {
      setStatus("failed");
    });
};
const useProjectDocs = ({
  countPerPage,
  encodedQuery,
  lastEvaluatedKey,
  saveQueryInParams,
}: {
  saveQueryInParams?: boolean;
  lastEvaluatedKey?: string;
  encodedQuery?: string;
  countPerPage: number;
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const [slides, setSlides] = useState<ProjectDocument[]>([]);
  const [startKey, setStartKey] = useState<string | null>(
    lastEvaluatedKey ? lastEvaluatedKey : null
  );
  const [previousKeys, setPreviousKeys] = useState<
    (string | null | undefined)[]
  >([undefined, startKey]);
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [prevKeyIdx, setPrevStartKeyIdx] = useState(0);
  const prevStartKey = previousKeys[prevKeyIdx];
  const [query, setQuery] = useState<string | null>(
    encodedQuery
      ? encodedQuery
      : params.query
      ? params.query
      : encodeQuery({
          recordType: "projects",
          sortBy: {
            startDate: -1,
          },
        })
  );
  const intitalLastEvaluatedKey = useRef(startKey ? startKey : undefined);
  const intitalQuery = useRef(query ? query : undefined);
  //set data on mount
  useEffect(
    () =>
      fetchNewData({
        lastEvaluatedKey: intitalLastEvaluatedKey.current,
        query: intitalQuery.current,
        countPerPage,
        setPrevStartKeyIdx,
        setPreviousKeys,
        setSlides,
        setStartKey,
        setQuery,
        setStatus,
      }),
    [countPerPage]
  );
  useEffect(() => {
    if (!saveQueryInParams) return;
    if (!params.query && saveQueryInParams) navigate(`/projects/${query}`);
    if (query && saveQueryInParams && params.query !== query) {
      fetchNewData({
        query: query,
        countPerPage,
        setPrevStartKeyIdx,
        setPreviousKeys,
        setSlides,
        setStartKey,
        setQuery,
        setStatus,
      });
    }
  }, [navigate, query, params.query, saveQueryInParams, countPerPage]);
  useEffect(() => {
    unstable_batchedUpdates(() => {
      setStartKey(null);
      setPrevStartKeyIdx(0);
      setPreviousKeys([undefined, null]);
    });
  }, [query]);
  const fetchNewDataInputs = {
    query: query ? query : undefined,
    countPerPage,
    setPrevStartKeyIdx,
    setSlides,
    setStartKey,
    setQuery,
    setPreviousKeys,
    setStatus,
  };
  const newQuery = (query: string) => {
    return fetchNewData({
      query: query,
      countPerPage,
      setPrevStartKeyIdx,
      setPreviousKeys,
      setSlides,
      setStartKey,
      setQuery,
      setStatus,
    });
  };
  const previousPage = () => {
    fetchNewData({
      ...fetchNewDataInputs,
      lastEvaluatedKey: prevStartKey ? prevStartKey : undefined,
      navigate,
      action: "prev",
    });
  };
  const nextPage = () => {
    fetchNewData({
      ...fetchNewDataInputs,
      lastEvaluatedKey: startKey ? startKey : undefined,
      navigate,
      action: "next",
    });
  };
  return {
    slides,
    startKey,
    prevStartKey,
    status,
    previousPage,
    nextPage,
    newQuery,
  };
};
export default useProjectDocs;
