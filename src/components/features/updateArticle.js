import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateArticle = createAsyncThunk('updateArticle', async (props, { rejectWithValue }) => {
    const { id, formData } = props;
    const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
    const { access_token } = JSON.parse(localStorage.getItem("user"));
    return await axios.put(`${api}/update/${id}`, formData, {
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

const updateSlice = createSlice({
    name: 'updateArticle',
    initialState: {
        data: [],
    },
    extraReducers: {
        [updateArticle.pending]: state => { state.loading = true },
        [updateArticle.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload.message;
        },
        [updateArticle.rejected]: (state, { payload }) => { state.loading = false; state.error = payload },
    }
})
export default updateSlice.reducer;