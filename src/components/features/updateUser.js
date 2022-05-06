import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

export const updateUser = createAsyncThunk('updateUser',  async (props, { rejectWithValue }) => {
    const { id, formData } = props;
    const { access_token } = JSON.parse(localStorage.getItem("user"));
    await axios.put(api + "/updateUser/" + id, formData, {
        headers: {
            Authorization: "Bearer " + access_token,
        },
    })
    .then(res => res.data.message)
    .catch(err => {
        if (!err.response) {
          return rejectWithValue('aldaa')
        }
        return rejectWithValue(err.response.data.message);
      })
})

const updateUserSlice = createSlice({
    name: 'updateUser',
    initialState: {
        data: null,
    },
    extraReducers: {
        [updateUser.pending]: state => { state.loading = true },
        [updateUser.fulfilled]: (state, { payload }) => {
            state.data = payload?.user;
            state.loading = false;
        },
        [updateUser.rejected]: (state, action) => { state.loading = false; state.error = action.payload; },
        'updateUser/clear': (state) => { state.data = null; state.loading = false; state.error = null },
    }
})

export default updateUserSlice.reducer;