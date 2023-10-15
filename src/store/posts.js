import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (variables, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      const result = await response.json();
      return fulfillWithValue(result);
    } catch (e) {
      return rejectWithValue({ error: e.message });
    }
  },
);

const initialState = {
  list: [],
  changedPost: null,
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    changePost(state, { payload }) {
      state.changedPost = payload;
    },
    addPost(state, { payload }) {
      state.list = [
        { ...payload, id: state.list.sort((a, b) => b.id - a.id)[0].id + 1 },
        ...state.list,
      ];
    },
    removePost(state) {
      state.list = [
        ...state.list.filter((el) => el.id !== state.changedPost.id),
      ];
      state.changedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.error = action.payload.error;
    });
  },
});

export const { addPost, removePost, changePost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
