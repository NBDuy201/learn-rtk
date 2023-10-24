import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_PATH, API_TAG_TYPES, REDUCER_PATH } from 'common/constants'
import { IPost } from 'types/blog.type'
import { CustomError } from 'utils/helper'

const defBlogId = 'LIST'

export const blogApi = createApi({
  reducerPath: REDUCER_PATH.BLOG,
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  tagTypes: [API_TAG_TYPES.BLOG],
  endpoints: (builder) => ({
    getPostsList: builder.query<IPost[], void>({
      query: () => API_PATH.BLOG,
      // Refetch by tags
      // If invalidatesTags match providesTags then refetch
      providesTags: (results) => {
        if (results) {
          const final = [
            ...results.map(({ id }) => ({ type: API_TAG_TYPES.BLOG, id })),
            { type: API_TAG_TYPES.BLOG, id: defBlogId }
          ]
          return final
        }

        return [{ type: API_TAG_TYPES.BLOG, id: defBlogId }]
      }
    }),
    addPosts: builder.mutation<IPost, Omit<IPost, 'id'>>({
      query: (body) => {
        try {
          // Error testing
          // let a: any = null
          // a.b = 1

          return {
            url: API_PATH.BLOG,
            method: 'POST',
            body
          }
        } catch (error: any) {
          throw new CustomError(error.message)
        }
      },
      // Invalidate query by tags
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: API_TAG_TYPES.BLOG, id: defBlogId }])
    }),
    getPost: builder.query<IPost, string>({
      query: (id) => `${API_PATH.BLOG}/${id}`
    }),
    editPost: builder.mutation<IPost, { id: string; body: IPost }>({
      query: (data) => ({
        url: `${API_PATH.BLOG}/${data.id}`,
        method: 'PUT',
        body: data.body
      }),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: API_TAG_TYPES.BLOG, id: data.id }])
    }),
    deletePost: builder.mutation<{}, string>({
      query: (id) => ({
        url: `${API_PATH.BLOG}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => (error ? [] : [{ type: API_TAG_TYPES.BLOG, id }])
    })
  })
})

export const {
  useGetPostsListQuery,
  useAddPostsMutation,
  useGetPostQuery,
  useEditPostMutation,
  useDeletePostMutation
} = blogApi
