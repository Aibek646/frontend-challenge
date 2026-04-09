import {
    createSlice,
    createAsyncThunk,
    type SerializedError,
} from '@reduxjs/toolkit';
import axios from 'axios';

// const EXAMPLE_URL =
//     'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1';

const BASE_URL = 'https://api.thecatapi.com/v1/images/search?limit=20';

interface ISingleCat {
    id: string;
    url: string;
    width: number;
    height: number;
}

interface ISingleState {
    data: ISingleCat[] | null;
    loading: boolean;
    error: SerializedError | null;
    totalPages?: number;
}

export const getCats = createAsyncThunk('getCats', async () => {
    const response = await axios.get(`${BASE_URL}`, {
        headers: {
            'x-api-key': import.meta.env.VITE_CAT_API_KEY,
        },
    });
    console.log(response.data);
    return response.data;
});

const initialState: ISingleState = {
    data: null,
    loading: false,
    error: null,
    totalPages: 0,
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
                state.data = action.payload;
            })
            .addCase(getCats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            });
    },
});

export default CatsSlice.reducer;
