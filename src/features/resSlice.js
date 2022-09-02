import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: [],
  status: null,
};

export const getBooks = createAsyncThunk("books/getBooks", async ({ search }) => {
  return await axios
    .get(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        search +
        "&key=AIzaSyB-BhfMivV1lWNG8H1RJ8_r3mDCws0GTIw" +
        "&maxResults=20"
    )
    .then((res) => res?.data.items);
});

export const resSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    remove: (state, action) => {
      state.value.splice(action.payload, 1);
    },
  },
  extraReducers: {
    [getBooks.pending]: (state, action) => {
      state.status = "loading";
    },
    [getBooks.fulfilled]: (state, { payload }) => {
      state.value = payload;
      state.status = "success";
    },
    [getBooks.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default resSlice.reducer;
