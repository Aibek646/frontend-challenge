import {
    createSlice,
    createAsyncThunk,
    type SerializedError,
} from '@reduxjs/toolkit';
import axios from 'axios';

// const EXAMPLE_URL =
//     'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1';

const BASE_URL = 'https://api.thecatapi.com/v1/images/search?limit=20';

export interface Cat {
    id: string;
    url: string;
    width?: number;
    height?: number;
}

interface CatState {
    data: Cat[];
    loading: boolean;
    error: SerializedError | null;
    page: number;
    hasMore: boolean;
}

export const getCats = createAsyncThunk('getCats', async (page: number) => {
    const response = await axios.get(`${BASE_URL}&page=${page}`, {
        headers: {
            'x-api-key': import.meta.env.VITE_CAT_API_KEY,
        },
    });
    console.log(response.data);
    return response.data;
});

const initialState: CatState = {
    data: [],
    loading: false,
    error: null,
    page: 0,
    hasMore: true,
};

const CatsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCats.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCats.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, ...action.payload];
                state.page += 1;
                state.hasMore = action.payload.length === 20;
            })
            .addCase(getCats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            });
    },
});

export default CatsSlice.reducer;
