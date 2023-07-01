export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    pageSize: number;
    currentPage: number;
    totalPages: number;
    totalDocuments: number;
  };
};
