import { RootState } from "../../../../app/store/store";

export const getComments = (state: RootState) => state.commentSlice.comments;
export const getLoadingStatus = (state: RootState) => state.commentSlice.loading;