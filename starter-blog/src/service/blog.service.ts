import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_PATH, API_TAG_TYPES, REDUCER_PATH } from 'common/constants'
import { IPost } from 'types/blog.type'

const defBlogId = 'LIST'

export const blogApi = createApi({
  reducerPath: REDUCER_PATH.BLOG,
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  tagTypes: [API_TAG_TYPES.BLOG],
  endpoints: (builder) => ({
    getPostsList: builder.query<IPost[], void>({
      query: () => API_PATH.BLOG,
      // Refetch by tags
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
      query: (body) => ({
        url: API_PATH.BLOG,
        method: 'POST',
        body
      }),
      // Invalidate query by tags
      invalidatesTags: (result, error, body) => [{ type: API_TAG_TYPES.BLOG, id: defBlogId }]
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
      invalidatesTags: (result, error, body) => [{ type: API_TAG_TYPES.BLOG, id: defBlogId }]
    })
  })
})

export const { useGetPostsListQuery, useAddPostsMutation, useGetPostQuery, useEditPostMutation } = blogApi
