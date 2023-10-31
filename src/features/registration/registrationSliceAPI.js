import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { preLoginURL } from '../../constants/API';

export const registrationSliceAPI = createApi({
  reducerPath: 'registrationSliceAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${preLoginURL}/Account`,
  }),
  endpoints: (builder) => ({
    postAPI: builder.mutation({
      query(reqObj) {
        return {
          url: `register`,
          method: 'POST',
          body: reqObj,
        };
      },
    }),
  }),
});

export const { usePostAPIMutation } = registrationSliceAPI;
