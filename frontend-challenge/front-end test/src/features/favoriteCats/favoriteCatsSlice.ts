import { createSlice } from '@reduxjs/toolkit';
import type { Cat } from '../cats/catsSlice.ts';

const STORAGE_KEY = 'favoriteCats';

interface FavoriteCatsState {
    items: Cat[];
}

const loadFromStorage = (): Cat[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const initialState: FavoriteCatsState = {
    items: loadFromStorage(),
};

const favoriteCatsSlice = createSlice({
    name: 'favoriteCats',
    initialState,
    reducers: {
        toggleFavorite(state, action) {
            const exists = state.items.some((c) => c.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter(
                    (c) => c.id !== action.payload.id
                );
            } else {
                state.items.push(action.payload);
            }
        },
    },
});

export const { toggleFavorite } = favoriteCatsSlice.actions;
export default favoriteCatsSlice.reducer;
