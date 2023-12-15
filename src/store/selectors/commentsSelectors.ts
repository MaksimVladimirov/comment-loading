import { RootState } from "../store";

export const getComments = (state: RootState) => state.commentSlice.comments;
export const getLoadingStatus = (state: RootState) => state.commentSlice.loading;