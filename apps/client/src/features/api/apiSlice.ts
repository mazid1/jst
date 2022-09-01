import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: () => '/organizations',
    }),
  }),
});

export const { useGetOrganizationsQuery } = apiSlice;
