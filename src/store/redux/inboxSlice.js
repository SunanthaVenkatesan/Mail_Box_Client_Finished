import { createSlice } from "@reduxjs/toolkit";

const initialInboxState = {
  emails: {},
  read:false

  
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState: initialInboxState,
  reducers: {
    onEmailFetch(state, action) {
      //console.log(action)
      state.emails = action.payload;
    },
    onEmailRead(state, action) {
      state.emails[action.payload.read] = true
    }
  },
});

export const inboxActions = inboxSlice.actions;
export default inboxSlice;
