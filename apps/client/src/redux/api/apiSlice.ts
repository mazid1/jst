import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['ORGANIZATION', 'CURRENT_USER', 'UNAUTHORIZED'],
  endpoints: (build) => ({}),
});
