import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '../../utils/customBaseQuery ';

const [LIST_TAG] = ['Branches'];
export const brancheSliceAPI = createApi({
  reducerPath: 'brancheAPI',
  baseQuery: customBaseQuery({
    baseUrl: `/branch`,
  }),
  tagTypes: [LIST_TAG],
  endpoints: (builder) => ({
    getAPI: builder.query({
      query: ({ pageNumber, pageSize, storeId }) =>
        `list?store_id=${storeId}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
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

    getBranchesAPI: builder.query({
      query: ({ storeId }) =>
        `list?${storeId !== undefined ? `store_id=${storeId}` : ''}`,
    }),
  }),
});

export const {
  useGetAPIQuery,
  useAddAPIMutation,
  useRemoveAPIMutation,
  useUpdateAPIMutation,
  useGetBranchesAPIQuery,
} = brancheSliceAPI;
