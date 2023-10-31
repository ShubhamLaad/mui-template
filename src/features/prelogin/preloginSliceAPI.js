import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { preLoginURL } from '../../constants/API';

export const preloginSliceAPI = createApi({
  reducerPath: 'preloginAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${preLoginURL}/Account`,
  }),
  endpoints: (builder) => ({
    authenticateAPI: builder.mutation({
      query(reqObj) {
        return {
          url: `authenticate`,
          method: 'POST',
          body: reqObj,
        };
      },
    }),
  }),
});

export const { useAuthenticateAPIMutation } = preloginSliceAPI;
