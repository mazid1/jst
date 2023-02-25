import { resetUser, setUser, User } from '../slices/userSlice';
import { apiSlice } from './apiSlice';

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
          await queryFulfilled;
          await dispatch(authApiSlice.endpoints.currentUser.initiate());
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
          dispatch(apiSlice.util.resetApiState());
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
          dispatch(resetUser());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useCurrentUserQuery } =
  authApiSlice;
