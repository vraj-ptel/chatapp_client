import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, getAdmin,adminLogOut } from "../thunks/admin";
import toast from "react-hot-toast";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAdmin: false,
    loader: true,
   
  },
  reducers: {
   
    userExist: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExist: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isAdmin = true;
        toast.success(action.payload);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isAdmin = false;
        toast.error(action.error.message);
      })


      .addCase(getAdmin.fulfilled,(state,action)=>{
        if(action.payload){
            state.isAdmin=true;
        }else{
            state.isAdmin=false;
        }
        
      })
      .addCase(getAdmin.rejected,(state,action)=>{
        state.isAdmin=false
      })


      .addCase(adminLogOut.fulfilled,(state,action)=>{
            state.isAdmin=false;
            toast.success(action.payload)
      })
      .addCase(adminLogOut.rejected,(state,action)=>{
        
        toast.error(action.error.message)
      })
  },
});

export const { userExist, userNotExist } = authSlice.actions;

export default authSlice;
