import { createSlice } from '@reduxjs/toolkit';

interface Cat {
    id: string;
    url: string;
}

interface FavoriteCatsState {
    items: Cat[];
}

const loadFromStorage = (): Cat[] => {
    const data = localStorage.getItem('favoriteCats');
    return data ? JSON.parse(data) : [];
};

const initialState: FavoriteCatsState = {
    items: loadFromStorage(),
};

const favoriteCatsSlice = createSlice({
    name: 'favoriteCats',
    initialState,
    reducers: {
        toggleFavorite(state, action) {
            const exists = state.items.find((c) => c.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter(
                    (c) => c.id !== action.payload.id
                );
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem('favoriteCats', JSON.stringify(state.items));
        },
    },
});

export const { toggleFavorite } = favoriteCatsSlice.actions;
export default favoriteCatsSlice.reducer;
