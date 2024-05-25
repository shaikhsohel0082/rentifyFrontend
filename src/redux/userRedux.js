import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const createUserAsynch = createAsyncThunk(
  "user/createUser",
  async (user) => {
    const res = await axios.post(
      "http://localhost:8200/api/users/create",
      user
    );
    return res.data;
  }
);
export const loginUserAsynch = createAsyncThunk(
  "user/loginUserAsynch",
  async (user) => {
    try {
      const res = await axios.post(
        "http://localhost:8200/api/users/login",
        user
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const findUserById = createAsyncThunk(
  "user/findUserById",
  async (id) => {
    console.log(id);
    const res = await axios.get(`http://localhost:8200/api/users/${id}`);
    console.log(res.data);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    owner: null,
  },
  reducers: {
    logoutUser: (state, action) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUserAsynch.fulfilled, (state, action) => {
      state.isFetching = false;
    });
    builder.addCase(loginUserAsynch.fulfilled, (state, action) => {
      console.log("payload", action.payload);
      state.isFetching = false;
      if (action.payload) {
        state.currentUser = action.payload.user;
      }else{
        state.currentUser = null;
      }
    });
    builder.addCase(findUserById.fulfilled, (state, action) => {
      state.isFetching = false;
      console.log("payload", action.payload);
      state.owner = action.payload;
    });
  },
});

const userReducer = userSlice.reducer;
export const currentUser = (state) => state.userReducer.currentUser;
export default userReducer;
export const logoutUser = userSlice.actions.logoutUser;
export const ownerSelector = (state) => state.userReducer.owner;
