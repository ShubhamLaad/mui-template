import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '../../utils/customBaseQuery ';
export const [Home_API] = ['Home'];

export const homeSliceAPI = createApi({
  reducerPath: 'homeAPI',
  baseQuery: customBaseQuery({
    baseUrl: '/system',
  }),
  tagTypes: [Home_API],
  endpoints: (builder) => ({
    getAPI: builder.query({
      query: () => '/stats',
      providesTags: [Home_API],
      keepUnusedDataFor: 1,
    }),
  }),
});

export const { useGetAPIQuery } = homeSliceAPI;
