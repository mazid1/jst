import { Application } from '../../@types';
import { apiSlice } from './apiSlice';

const urlPrefix = '/applications';

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getApplications: build.query<Application[], void>({
      query: () => urlPrefix,
      providesTags: (result = [], error, arg) => [
        ...result.map(({ _id }) => ({
          type: 'APPLICATION' as const,
          id: _id,
        })),
        { type: 'APPLICATION', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetApplicationsQuery } = applicationApiSlice;
