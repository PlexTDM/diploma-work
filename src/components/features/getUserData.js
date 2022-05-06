import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserData = createAsyncThunk('getUserData', async userId => {

    const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
    const { access_token } = JSON.parse(localStorage.getItem("user"));

    const { data } = await axios.get(api + "/getUser/" + userId, {
        headers: {
            Authorization: "Bearer " + access_token,
        },
    })
    return data;
});

const userDataSlice = createSlice({
    name: 'getUserData',
    initialState: {
        user: null,
    },
    extraReducers: {
        [getUserData.pending]: state => { state.loading = true },
        [getUserData.fulfilled]: (state, { payload }) => { state.user = payload.user; state.loading = false },
        [getUserData.rejected]: (state, { payload }) => { state.loading = false; state.error = payload },
        'userData/clear': (state) => { state.user = null; state.loading = false; state.error = null },
    }
})
export default userDataSlice.reducer;