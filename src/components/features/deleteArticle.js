import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteArticle = createAsyncThunk('homepage', async (id, { rejectWithValue }) => {
    const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
    const { access_token } = JSON.parse(localStorage.getItem("user"));

    return await axios.delete(`${api}/delete/${id}`, {
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

const deleteSlice = createSlice({
    name: 'homepage',
    initialState: {
        data: [],
    },
    extraReducers: {
        [deleteArticle.pending]: state => { state.loading = true },
        [deleteArticle.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload.message;
        },
        [deleteArticle.rejected]: (state, { payload }) => { state.loading = false; state.error = payload },
    }
})
export default deleteSlice.reducer;