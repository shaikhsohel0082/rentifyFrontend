import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://rentifybackend-gq7p.onrender.com";
export const startServer = createAsyncThunk("posts/startServer", async () => {
  const res = await axios.get(`https://rentifybackend-gq7p.onrender.com/`);
  return res.data;
});
export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const res = await axios.get(`${URL}/api/posts/getposts`);
  // console.log(res.data);
  return res.data;
});
export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ id, data }) => {
    const res = await axios.post(`${URL}/api/posts/createpost/${id}`, data);
    return res.data;
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }) => {
    console.log(data);
    console.log(id);
    const res = await axios.put(`${URL}/api/posts/updatepost/${id}`, data);
    return res.data;
  }
);
export const likePostAsync = createAsyncThunk(
  "posts/likePost",
  async ({ id, data }) => {
    const res = await axios.put(`${URL}/api/posts/likepost/${id}`);
    return res.data;
  }
);
export const sendMailAsync = createAsyncThunk(
  "posts/sendMail",
  async ({ data }) => {
    const res = await axios.post(`${URL}/api/posts/sendmail`, data);
    return res.data;
  }
);
export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async ({ id }) => {
    const res = await axios.delete(`${URL}/api/posts/deletepost/${id}`);
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
