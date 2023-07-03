export type PageInfo = {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PageInfo;
};
