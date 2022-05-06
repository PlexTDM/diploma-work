import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserArticles = createAsyncThunk('getUserArticles', async props => {

    const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
    const { access_token } = JSON.parse(localStorage.getItem("user"));

    const { data } = await axios.get(`${api}/getUserArticles/${props.userId}?skips=${props.skips}&limit=5`, {
        headers: {
            Authorization: "Bearer " + access_token,
        },
    });
    return data;

})

const userArticlesSlice = createSlice({
    name: 'getUserArticles',
    initialState: {
        articles: null,
    },
    extraReducers: {
        [getUserArticles.pending]: (state, action) => { state.loading = true },
        [getUserArticles.fulfilled]: (state, { payload }) => {
            state.articles = payload.articles;
            state.loading = false;
            state.count = payload.count;
        },
        [getUserArticles.rejected]: (state, { payload }) => { state.loading = false; state.error = payload },
        'userArticles/clear': (state) => { state.articles = null; state.loading = false; state.error = null },
    }
});

export default userArticlesSlice.reducer;