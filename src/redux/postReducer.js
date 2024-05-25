import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const res = await axios.get("http://localhost:8200/api/posts/getposts");
  // console.log(res.data);
  return res.data;
});
export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ id, data }) => {
    const res = await axios.post(
      `http://localhost:8200/api/posts/createpost/${id}`,
      data
    );
    return res.data;
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }) => {
    console.log(data);
    console.log(id);
    const res = await axios.put(
      `http://localhost:8200/api/posts/updatepost/${id}`,
      data
    );
    return res.data;
  }
);
export const likePostAsync = createAsyncThunk(
  "posts/likePost",
  async ({ id, data }) => {
    const res = await axios.put(
      `http://localhost:8200/api/posts/likepost/${id}`
    );
    return res.data;
  }
);
export const sendMailAsync = createAsyncThunk(
  "posts/sendMail",
  async ({ data }) => {
    const res = await axios.post(
      `http://localhost:8200/api/posts/sendmail`,
      data
    );
    return res.data;
  }
);
export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async ({ id }) => {
    const res = await axios.delete(
      `http://localhost:8200/api/posts/deletepost/${id}`
    );
    return res.data;
  }
);
const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});
const postReducer = postSlice.reducer;
export const postSelector = (state) => state.postReducer.posts;
export default postReducer;
