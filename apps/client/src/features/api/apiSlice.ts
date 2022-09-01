import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['ORGANIZATION'],
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: () => '/organizations',
      providesTags: (result = [], error, arg) => [
        ...result.map(({ _id }: { _id: string }) => ({
          type: 'ORGANIZATION',
          id: _id,
        })),
        { type: 'ORGANIZATION', id: 'LIST' },
      ],
    }),
    getOrganization: builder.query({
      query: (organizationId) => `/organizatins/${organizationId}`,
      providesTags: (result, error, arg) => [{ type: 'ORGANIZATION', id: arg }],
    }),
    createOrganization: builder.mutation({
      query: (initialOrganization) => ({
        url: '/organizations',
        method: 'POST',
        body: initialOrganization,
      }),
      invalidatesTags: [{ type: 'ORGANIZATION', id: 'LIST' }],
    }),
    updateOrganization: builder.mutation({
      query: (organization) => ({
        url: `/organizations/${organization._id}`,
        method: 'PATCH',
        body: organization,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'ORGANIZATION', id: arg._id },
      ],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
} = apiSlice;
