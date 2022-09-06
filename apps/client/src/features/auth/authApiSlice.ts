import { apiSlice } from '../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (codeDto: { code: string }) => ({
        url: '/auth/google-login',
        method: 'POST',
        body: codeDto,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    currentUser: builder.query({
      query: () => '/users/me',
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useCurrentUserQuery } =
  authApiSlice;
