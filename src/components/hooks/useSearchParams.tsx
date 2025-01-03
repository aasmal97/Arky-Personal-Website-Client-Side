export type SetSearchType = (
  e: { query?: string },
  opt: { replace?: boolean }
) => void;
export const useSearchParams = (): [URLSearchParams, SetSearchType] => {
  const searchParams = new URLSearchParams(window.location.search);
  const setSearchParams = (
    e: { query?: string },
    opt: { replace?: boolean }
  ) => {
    if (e.query) {
      if (opt.replace) {
        searchParams.set("query", e.query);
      } else {
        searchParams.append("query", e.query);
      }
    }
    window.history.pushState({}, "", "?" + searchParams.toString());
  };
  return [searchParams, setSearchParams];
};
const useCustomSearchParams = ({
  saveQueryInParams,
}: {
  saveQueryInParams?: boolean;
}): [
  {
    [k: string]: string;
  },
  SetSearchType
] => {
  const [search, setSearchState] = useSearchParams();
  const searchAsObject = Object.fromEntries(new URLSearchParams(search));
  const setSearch: SetSearchType = (e, nav) => {
    if (saveQueryInParams) setSearchState(e, nav);
  };
  return [searchAsObject, setSearch];
};

export default useCustomSearchParams;
