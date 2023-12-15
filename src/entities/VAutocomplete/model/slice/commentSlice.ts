import { createSlice } from '@reduxjs/toolkit';
import { fetchComments } from '../services/fetchComments';
import { LoadingStatus } from '../types/loadingStatus';
import { IComment } from '../types/comment';


interface ICommentSliceState {
  comments: IComment[] | never[];
  loading: LoadingStatus;
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
