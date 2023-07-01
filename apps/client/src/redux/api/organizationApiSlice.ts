import {
  CreateOrganizationDto,
  Organization,
  UpdateOrganizationDto,
} from '../../@types';
import { PaginatedResponse } from '../../@types/PaginatedResponse';
import { PaginationQuery } from '../../@types/PaginationQuery';
import { apiSlice } from './apiSlice';
import { OrganizationFilterQuery as OrganizationFilter } from './types/OrganizationFilterQuery';

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrganizations: build.query<
      PaginatedResponse<Organization>,
      PaginationQuery
    >({
      query: ({ skip, limit }) => `/organizations?skip=${skip}&limit=${limit}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'ORGANIZATION' as const,
                id: _id,
              })),
              { type: 'ORGANIZATION', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'ORGANIZATION', id: 'PARTIAL-LIST' }],
    }),
    getOrganizationsFiltered: build.query<Organization[], OrganizationFilter>({
      query: (filterQuery: OrganizationFilter) => {
        const filterParams = (
          Object.keys(filterQuery) as (keyof OrganizationFilter)[]
        )
          .map((key: keyof OrganizationFilter) => `${key}=${filterQuery[key]}`)
          .join('&');
        return `/organizations/filter?${filterParams}`;
      },
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
      invalidatesTags: [{ type: 'ORGANIZATION', id: 'PARTIAL-LIST' }],
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
    deleteOrganization: build.mutation<void, string>({
      query: (organizationId) => ({
        url: `/organizations/${organizationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'ORGANIZATION', id: 'PARTIAL-LIST' }],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationsFilteredQuery,
  useLazyGetOrganizationsFilteredQuery,
  useGetOrganizationQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationApiSlice;
