import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadArticle = createAsyncThunk('uploadArticle', async (formData, { rejectWithValue }) => {
    const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
    const { access_token } = JSON.parse(localStorage.getItem("user"));
    return await axios.post(api + '/upload', formData, {
        headers: { Authorization: "Bearer " + access_token },
    })
        .then(res => res.data)
        .catch(err => {
            if (!err.response) {
                return rejectWithValue('aldaa')
            }
            return rejectWithValue(err.response.data.message);
        })
});

const uploadSlice = createSlice({
    name: 'uploadArticle',
    initialState: {
        data: [],
    },
    extraReducers: {
        [uploadArticle.pending]: state => { state.loading = true },
        [uploadArticle.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload.message;
        },
        [uploadArticle.rejected]: (state, { payload }) => { state.loading = false; state.error = payload },
        'uploadArticle/clear': state => { state.data = [] },
    }
})
export default uploadSlice.reducer;