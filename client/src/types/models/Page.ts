export type Page<T> = {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: 10;
    sort: {
      empty: boolean;
      sorted: boolean;
      unpaged: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
  last: false;
  size: 10;
  number: 0;
  sort: {
    empty: boolean;
    sorted: boolean;
    unpaged: boolean;
  };
  numberOfElements: 10;
  first: boolean;
  empty: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [additionalKey: string]: any;
};
