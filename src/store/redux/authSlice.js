import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  loginEmail: "",
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    // onTokenReceive(state, action) {
    //   state.token = action.payload;
    //   console.log(state.token)
    //   state.loginEmail = action.payload;
    //   // console.log(state.email)
    //   localStorage.setItem("token", action.payload);
    //   //localStorage.setItem("loginEmail", action.payload);
    // },
    login(state,action) {
        state.token = action.payload;
        console.log(state.token)
        localStorage.setItem("token", action.payload);
      state.isAuthenticated = true
      
    },
    setUserMail(state,action){
        localStorage.setItem('loginEmail',action.payload)
    },
  
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("loginEmail");
      localStorage.removeItem("token");
    },
    isLoginAuthenticated(state){
        if(localStorage.getItem("token")){
            state.isLogin=true;
            state.token=localStorage.getItem('token')
            state.loginEmail=localStorage.getItem('loginEmail')
        }
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;
