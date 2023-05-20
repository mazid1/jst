import { Application } from '../../@types';
import { CreateApplicationDto } from '../../components/application/applicationSchema';
import { apiSlice } from './apiSlice';

type UpdateApplicationPayload = {
  application: CreateApplicationDto;
  id: string;
};

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
    getApplication: build.query<Application, string>({
      query: (applicationId) => `${urlPrefix}/${applicationId}`,
      providesTags: (result, error, arg) => [{ type: 'APPLICATION', id: arg }],
    }),
    createApplication: build.mutation<Application, CreateApplicationDto>({
      query: (initialApplication) => ({
        url: urlPrefix,
        method: 'POST',
        body: initialApplication,
      }),
      invalidatesTags: [{ type: 'APPLICATION', id: 'LIST' }],
    }),
    updateApplication: build.mutation<Application, UpdateApplicationPayload>({
      query: (data) => ({
        url: `${urlPrefix}/${data.id}`,
        method: 'PATCH',
        body: data.application,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'APPLICATION', id: arg.id },
      ],
    }),
    deleteApplication: build.mutation<void, string>({
      query: (applicationId) => ({
        url: `${urlPrefix}/${applicationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'APPLICATION', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetApplicationQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} = applicationApiSlice;
