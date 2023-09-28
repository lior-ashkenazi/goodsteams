export type Page<T> = {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unpaged: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
  last: false;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unpaged: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [additionalKey: string]: any;
};
