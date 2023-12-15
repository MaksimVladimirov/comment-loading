import { configureStore } from '@reduxjs/toolkit';
import commentSlice from '../../entities/VAutocomplete/model/slice/commentSlice';

export const store = configureStore({
    reducer: {
        commentSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
