import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoSliceApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => `todos`,
      providesTags: { type: 'Todos' },
    }),
    addTodo: builder.mutation({
      query(text) {
        return {
          url: `todos`,
          method: 'POST',
          body: {
            text,
          },
        };
      },
      invalidatesTags: { type: 'Todos' }, // fetch data once again
    }),
    updateTodo: builder.mutation({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: 'PUT',
          body: todo,
        };
      },
      invalidatesTags: { type: 'Todos' },
    }),
    deleteTodo: builder.mutation({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: 'DELETE',
          body: todo,
        };
      },
      invalidatesTags: { type: 'Todos' },
    }),
  }),
});

export const {
  useGetAllQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoSliceApi;
