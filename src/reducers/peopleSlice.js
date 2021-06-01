import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestType } from "../backend/backend";

const initialState = {
  people: [],
  status: "idle",
  error: null,
};

export const getPeople = createAsyncThunk(
  "people/getPeople",
  async (arg = null, { getState, dispatch }) => {
    try {
      const { token } = getState().user.user;
      const request = {
        url: requestType.get_users,
        options: {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      };
      const response = await fetch(request.url, request.options);
      const json = await response.json();
      return json;
    } catch (err) {
      return err;
    }
  }
);

export const peopleSlice = createSlice({
  name: "people",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getPeople.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPeople.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.people = action.payload;
    },
    [getPeople.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default peopleSlice.reducer;
