import { apiSlice } from '../api/apiSlice';
import { User, resetUser, setUser } from './userSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, { code: string }>({
      query: (codeDto: { code: string }) => ({
        url: '/auth/google-login',
        method: 'POST',
        body: codeDto,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(setUser(user));
        } catch (e) {
          console.log('failed to login', e);
          dispatch(resetUser());
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e) {
          console.log('failed to logout', e);
        } finally {
          dispatch(resetUser());
        }
      },
    }),

    currentUser: builder.query<User, void>({
      query: () => '/users/me',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(setUser(user));
        } catch (e) {
          console.log('failed to get current user', e);
          dispatch(resetUser());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useCurrentUserQuery } =
  authApiSlice;
