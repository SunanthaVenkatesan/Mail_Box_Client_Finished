import { createSlice } from "@reduxjs/toolkit";

const initialSentState = {
  emails: {},
};

const sentSlice = createSlice({
  name: "sent",
  initialState: initialSentState,
  reducers: {
    onEmailSend(state, action) {
      //console.log(`on email send called`, action.payload);
      state.emails = action.payload
    },
    onEmailRead(state, action) {
      state.emails[action.payload.read] = true
    }
  },
});

export const sentActions = sentSlice.actions;
export default sentSlice;
