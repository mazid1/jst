import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { apiSlice } from '../api/apiSlice';

export interface AuthState {
  name: string | null;
  email: string | null;
  picture: string | null;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (codeDto: { code: string }) => ({
        url: '/auth/google-login',
        method: 'POST',
        body: codeDto,
      }),
      invalidatesTags: ['CURRENT_USER'],
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['CURRENT_USER'],
    }),

    currentUser: builder.query<AuthState, void>({
      async queryFn(arg, api, extraOptions, baseQuery) {
        const userResult = await baseQuery('/users/me');

        if (userResult.error?.status === 401)
          return {
            data: userResult.data as AuthState,
          };

        return userResult.data
          ? {
              data: userResult.data as AuthState,
            }
          : { error: userResult.error as FetchBaseQueryError };
      },
      providesTags: ['CURRENT_USER'],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useCurrentUserQuery } =
  authApiSlice;
