import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHomeArticles = createAsyncThunk('homepage', async num => {
    const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
    const { data } = await axios.get(`${api}/latest/${num}`)
    return data;
});

const homepageSlice = createSlice({
    name: 'homepage',
    initialState: {
        data: [],
    },
    extraReducers: {
        [getHomeArticles.pending]: state => { state.loading = true },
        [getHomeArticles.fulfilled]: (state, { payload }) => {
            let arr = state.data.concat(payload.message[0]);
            arr.sort((a, b) => a._id < b._id ? 1 : a._id > b._id ? -1 : 0);
            state.loading = false;
            state.data = arr;
        },
        [getHomeArticles.rejected]: (state, { payload }) => { state.loading = false; state.error = payload },
    }
})
export default homepageSlice.reducer;