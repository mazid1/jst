import { Organization } from '../../@types';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '../../@types/organization';
import { apiSlice } from './apiSlice';

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrganizations: build.query<Organization[], void>({
      query: () => '/organizations',
      providesTags: (result = [], error, arg) => [
        ...result.map(({ _id }) => ({
          type: 'ORGANIZATION' as const,
          id: _id,
        })),
        { type: 'ORGANIZATION', id: 'LIST' },
      ],
    }),
    getOrganization: build.query<Organization, string>({
      query: (organizationId) => `/organizatins/${organizationId}`,
      providesTags: (result, error, arg) => [{ type: 'ORGANIZATION', id: arg }],
    }),
    createOrganization: build.mutation<Organization, CreateOrganizationDto>({
      query: (initialOrganization) => ({
        url: '/organizations',
        method: 'POST',
        body: initialOrganization,
      }),
      invalidatesTags: [{ type: 'ORGANIZATION', id: 'LIST' }],
    }),
    updateOrganization: build.mutation<
      Organization,
      { org: UpdateOrganizationDto; id: string }
    >({
      query: (data) => ({
        url: `/organizations/${data.id}`,
        method: 'PATCH',
        body: data.org,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'ORGANIZATION', id: arg.id },
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
