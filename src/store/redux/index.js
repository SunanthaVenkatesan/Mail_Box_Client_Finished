import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import inboxSlice from "./inboxSlice";
import sentSlice from "./sentSlice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, inbox: inboxSlice.reducer, sent: sentSlice.reducer },
});

export default store;
