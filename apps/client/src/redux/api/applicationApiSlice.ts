import { apiSlice } from './apiSlice';

const urlPrefix = '/applications';

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getApplications: build.query({
      query: () => urlPrefix,
      providesTags: (result = [], error, arg) => [
        ...result.map(({ _id }: { _id: string }) => ({
          type: 'APPLICATION',
          id: _id,
        })),
        { type: 'APPLICATION', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetApplicationsQuery } = applicationApiSlice;
