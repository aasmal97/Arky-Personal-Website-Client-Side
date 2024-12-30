import { useSearchParams} from "react-router";
const useCustomSearchParams = ({
  saveQueryInParams,
}: {
  saveQueryInParams?: boolean;
}): [
  {
    [k: string]: string;
  },
  ReturnType<typeof useSearchParams>[1]
] => {
  const [search, setSearchState] = useSearchParams();
  const searchAsObject = Object.fromEntries(new URLSearchParams(search));
  const setSearch: ReturnType<typeof useSearchParams>[1] = (e, nav) => {
    if (saveQueryInParams) setSearchState(e, nav);
  };
  return [searchAsObject, setSearch];
};

export default useCustomSearchParams;
