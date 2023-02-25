import { apiSlice } from './apiSlice';

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrganizations: build.query({
      query: () => '/organizations',
      providesTags: (result = [], error, arg) => [
        ...result.map(({ _id }: { _id: string }) => ({
          type: 'ORGANIZATION',
          id: _id,
        })),
        { type: 'ORGANIZATION', id: 'LIST' },
      ],
    }),
    getOrganization: build.query({
      query: (organizationId) => `/organizatins/${organizationId}`,
      providesTags: (result, error, arg) => [{ type: 'ORGANIZATION', id: arg }],
    }),
    createOrganization: build.mutation({
      query: (initialOrganization) => ({
        url: '/organizations',
        method: 'POST',
        body: initialOrganization,
      }),
      invalidatesTags: [{ type: 'ORGANIZATION', id: 'LIST' }],
    }),
    updateOrganization: build.mutation({
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
} = organizationApiSlice;
