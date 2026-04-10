import { configureStore } from '@reduxjs/toolkit';
import catsReducer from '../features/cats/catsSlice.ts';
import favoriteReducer from '../features/favoriteCats/favoriteCatsSlice.ts';

export const store = configureStore({
    reducer: {
        cats: catsReducer,
        favorites: favoriteReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('favoriteCats', JSON.stringify(state.favorites.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
