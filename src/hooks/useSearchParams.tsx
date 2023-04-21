import { useSearchParams} from "react-router-dom";
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
  const setSearch: ReturnType<typeof useSearchParams>[1] = (e) => {
    if (saveQueryInParams) setSearchState(e);
  };
  return [searchAsObject, setSearch];
};

export default useCustomSearchParams;
