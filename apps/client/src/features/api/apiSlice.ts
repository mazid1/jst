import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['ORGANIZATION'],
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: () => '/organizations',
      providesTags: ['ORGANIZATION'],
    }),
    createOrganization: builder.mutation({
      query: (initialOrganization) => ({
        url: '/organizations',
        method: 'POST',
        body: initialOrganization,
      }),
      invalidatesTags: ['ORGANIZATION'],
    }),
  }),
});

export const { useGetOrganizationsQuery, useCreateOrganizationMutation } =
  apiSlice;
