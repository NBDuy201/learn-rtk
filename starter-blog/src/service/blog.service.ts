import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from 'types/blog.type'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => `posts`
    }),
    addPosts: builder.mutation<IPost, Omit<IPost, 'id'>>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body
      })
    })
  })
})

export const { useGetPostsQuery, useAddPostsMutation } = blogApi
