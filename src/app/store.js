import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../redux/postReducer";
import userReducer from "../redux/userRedux";
export const store = configureStore({
  reducer: { postReducer, userReducer },
});
