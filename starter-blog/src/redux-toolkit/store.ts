import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blog.slice'
import { blogApi } from 'service/blog.service'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer // add reducer from api slice
  },

  // Add api middleware for caching, invalidation
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

// refetchOnFocus
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
