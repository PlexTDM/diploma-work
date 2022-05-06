import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk('register', async (formData, { rejectWithValue }) => {
  const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

  return await axios.post(`${api}/register`, formData)
  .then(res=>res.data)
  .catch(err => {
    if (!err.response) {
      return rejectWithValue('aldaa')
    }
    return rejectWithValue(err.response.data.message);
  })
})

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    data: null,
  },
  extraReducers: {
    [register.pending]: state => { state.loading = true },
    [register.fulfilled]: (state, { payload }) => {
      state.data = payload?.user;
      state.loading = false;
    },
    [register.rejected]: (state, action) => { state.loading = false; state.error = action.payload; },
    'register/clear': (state) => { state.data = null; state.loading = false; state.error = null },
  }
});

export default registerSlice.reducer;
