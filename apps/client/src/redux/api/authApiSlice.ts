import { resetUser, User } from '../slices/userSlice';
import { apiSlice } from './apiSlice';
import { userApiSlice } from './userApiSlice';

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
          await dispatch(userApiSlice.endpoints.me.initiate());
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
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
