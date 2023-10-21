import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IBlogState {
  postId: string
}

const initState: IBlogState = {
  postId: ''
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: initState,
  reducers: {
    startEditPost: (state, action: PayloadAction<string>) => {
      state.postId = action.payload
    },
    cancelEditPost: (state) => {
      state.postId = ''
    }
  }
})

export const { cancelEditPost, startEditPost } = blogSlice.actions
export default blogSlice.reducer
