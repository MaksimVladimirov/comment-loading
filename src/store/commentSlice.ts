import { createSlice } from '@reduxjs/toolkit';
import { fetchComments } from './fetchComments';

export interface IComment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

export type LoadingCommentStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

interface ICommentSliceState {
  comments: IComment[] | never[];
  loading: LoadingCommentStatus;
}


const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: 'idle',
  } as ICommentSliceState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = 'failed';
      });
  },
});


export default commentSlice.reducer;
