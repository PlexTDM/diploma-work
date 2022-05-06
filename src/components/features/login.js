import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('login', async (formData, { rejectWithValue }) => {
  const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

  return await axios.post(`${api}/login`, formData)
  .then(res=>res.data)
  .catch(err => {
    if (!err.response) {
      return rejectWithValue('aldaa')
    }
    return rejectWithValue(err.response.data.message);
  })
})

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    data: null,
  },
  extraReducers: {
    [login.pending]: state => { state.loading = true },
    [login.fulfilled]: (state, { payload }) => {
      state.data = payload?.user;
      state.loading = false;
    },
    [login.rejected]: (state, action) => { state.loading = false; state.error = action.payload; },
    'login/clear': (state) => { state.data = null; state.loading = false; state.error = null },
  }
});

export default loginSlice.reducer;
