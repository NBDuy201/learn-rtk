import { createSlice } from '@reduxjs/toolkit'

interface IBlogState {
  postId: string
}

const initState: IBlogState = {
  postId: ''
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: initState,
  reducers: {}
})

export default blogSlice.reducer
