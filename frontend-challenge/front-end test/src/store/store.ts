import { configureStore } from '@reduxjs/toolkit';
import catsReducer from '../features/cats/catsSlice.ts';

export const store = configureStore({
    reducer: {
        cats: catsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
