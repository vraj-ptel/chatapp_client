import { createSlice } from "@reduxjs/toolkit";
import { getOrSave } from "../../lib/feactures";
import { NEW_MESSAGE_ALERT } from "../../components/constant/event";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    notificationCount: 0,
    newMessagesAlert: getOrSave({key:NEW_MESSAGE_ALERT,get:true}) || [{
      chatId:"",
      count:0
    }]
   
  },
  reducers: {
    incrementNotification:(state,action)=>{
      state.notificationCount=state.notificationCount+1;
    },
    resetNotification:(state,action)=>{
      state.notificationCount=0;
    },
    setNewMessageAlert:(state,action)=>{
      const index=state.newMessagesAlert.findIndex(item=>item.chatId===action.payload.chatId);
      if(index !== -1){
        state.newMessagesAlert[index].count+=1;
      }else{
        state.newMessagesAlert.push({
          chatId:action.payload.chatId,
          count:1
        })
      }
    },
    removeNewMessageAlert:(state,action)=>{
      state.newMessagesAlert=state.newMessagesAlert.filter(item=>item.chatId!==action.payload.chatId);
    }
    
  },
});

export const {
  incrementNotification,
  resetNotification,
  setNewMessageAlert,
  removeNewMessageAlert
} = chatSlice.actions;

export default chatSlice;
