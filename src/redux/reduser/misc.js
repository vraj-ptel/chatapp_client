import { createSlice } from "@reduxjs/toolkit";

const miscSlice = createSlice({
  name: "misc",
  initialState: {
    onlineUsers:[],
    chatId:"",
    isUpdateProfile:false,
    isNewGroup: false,
    isAddMember: false,
    isNotification: false,
    isMobile: false,
    isSearch: false,
    isFileMenu: false,
    isDeleteMenu: false,
    uploadingLoader: false,
    selecedDeleteChat: {
      chatId: "",
      groupChat: false,
    },
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setIsUpdateProfile: (state, action) => {
      state.isUpdateProfile = action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    setNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setUploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setSelectedDeleteChat: (state, action) => {
      state.selecedDeleteChat = action.payload;
    },
  },
});

export const {
  setOnlineUsers,
  setChatId,
  setNewGroup,
  setAddMember,
  setNotification,
  setIsMobile,
  setSearch,
  setFileMenu,
  setDeleteMenu,
  setUploadingLoader,
  setSelectedDeleteChat,
  setIsUpdateProfile
} = miscSlice.actions;

export default miscSlice;
