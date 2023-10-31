import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '../../utils/customBaseQuery ';
const [LIST_TAG] = ['Stores'];

export const storeSliceApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: customBaseQuery({
    baseUrl: '/store',
  }),
  tagTypes: [LIST_TAG],
  endpoints: (builder) => ({
    getAPI: builder.query({
      query: ({ pageNumber, pageSize }) =>
        `list?PageNumber=${pageNumber}&PageSize=${pageSize}`,
      providesTags: [LIST_TAG],
    }),
    addAPI: builder.mutation({
      query(reqObj) {
        return {
          url: `add`,
          method: 'POST',
          body: reqObj,
        };
      },
      invalidatesTags: [LIST_TAG], // fetch data once again
    }),
    updateAPI: builder.mutation({
      query(store) {
        return {
          url: `update`,
          method: 'PUT',
          body: store,
        };
      },
      invalidatesTags: [LIST_TAG],
    }),
    removeAPI: builder.mutation({
      query(store) {
        return {
          url: `delete/${store.id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [LIST_TAG],
    }),

    getStoresAPI: builder.query({
      query: () => `list`,
    }),
  }),
});

export const {
  useGetAPIQuery,
  useAddAPIMutation,
  useRemoveAPIMutation,
  useUpdateAPIMutation,
  useGetStoresAPIQuery,
} = storeSliceApi;
