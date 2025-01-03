export type SearchParamsProps = {
  text?: string;
};
export type PaginationProps = {
  cursor?: string | null;
  take: number;
};
export type IdRequiredObj<T> = {
  id: string;
  score?: number;
} & T;
export type PaginationProviderProps<
  T,
  SearchFuncProps extends SearchParamsProps
> = {
  take: number;
  defaultData: {
    items: IdRequiredObj<T>[],
    newStartKey?: string | null 
  } | null | undefined;
  paginate: (
    props: PaginationProps & Partial<SearchFuncProps>
  ) => Promise<{
    items: IdRequiredObj<T>[],
    newStartKey?: string | null 
  } | null | undefined>;
  defaultParams?: Partial<SearchFuncProps>;
};
export type PaginatationProviderContextState = {
  props: <
    A,
    SearchFuncProps extends SearchParamsProps
  >() => PaginationProviderContextProps<A, SearchFuncProps>;
} | null;
export type PaginationProviderContextProps<
  T,
  SearchFuncProps extends SearchParamsProps
> = {
  isLoading: boolean;
  data: {
    items: IdRequiredObj<T>[],
    newStartKey?: string | null 
  };
  cursor: string | null;
  loadMore?: (params?: SearchFuncProps) => Promise<void>;
  loadNew?: (params?: SearchFuncProps) => Promise<void>;
};
export type PaginationChildrenProps<
  T,
  SearchFuncProps extends SearchParamsProps
> = Omit<PaginationProviderContextProps<T, SearchFuncProps>, "cursor">;
export type PaginationWrapperProps<
  T,
  SearchFuncProps extends SearchParamsProps
> = {
  threshold?: number;
  loadingComponent?: (
    ref: (node?: Element | null | undefined) => void
  ) => React.ReactNode;
  children: (
    props: PaginationChildrenProps<IdRequiredObj<T>, SearchFuncProps>
  ) => React.ReactNode;
};
