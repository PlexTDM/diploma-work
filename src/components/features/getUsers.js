import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

export const getUsers = createAsyncThunk('getUsers', async (page, { rejectWithValue }) => {
    const { access_token } = JSON.parse(localStorage.getItem("user"));
    const skips = page * 5;
    return await axios.get(`${api}/getUsers/${skips}`, { headers: { Authorization: "Bearer " + access_token } })
        .then(res => res.data)
        .catch(err => {
            if (!err.response) {
                return rejectWithValue('aldaa')
            }
            return rejectWithValue(err.response.data.message);
        })
})

const getUsersSlice = createSlice({
    name: 'getUsers',
    initialState: {
        data: null,
    },
    extraReducers: {
        [getUsers.pending]: state => { state.loading = true },
        [getUsers.fulfilled]: (state, { payload }) => {
            state.users = payload?.users;
            state.count = payload?.count;
            state.loading = false;
            console.log(payload);
        },
        [getUsers.rejected]: (state, action) => { state.loading = false; state.error = action.payload; },
        'getUsers/clear': (state) => { state.data = null; state.loading = false; state.error = null },
    }
})

export default getUsersSlice.reducer;