import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { preLoginURL } from '../../constants/API';

export const resetPassSliceAPI = createApi({
  reducerPath: 'resetPassAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${preLoginURL}/Account`,
  }),
  endpoints: (builder) => ({
    postAPI: builder.mutation({
      query(reqObj) {
        return {
          url: `/reset-password`,
          method: 'POST',
          body: reqObj,
        };
      },
    }),
  }),
});

export const { usePostAPIMutation } = resetPassSliceAPI;
