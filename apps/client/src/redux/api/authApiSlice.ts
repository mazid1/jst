import { User } from '../../@types';
import { history } from '../../helpers/history';
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
          await dispatch(userApiSlice.endpoints.getMe.initiate());
        } catch (e) {
          console.log('failed to login', e);
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
          // navigate to login page once logout succeeded
          history.navigate?.('/login');
        } catch (e) {
          console.log('failed to logout', e);
        } finally {
          // reset redux states
          dispatch(apiSlice.util.resetApiState());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
