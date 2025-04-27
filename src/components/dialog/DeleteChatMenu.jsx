import React, { useEffect } from "react";
import { Menu, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { setDeleteMenu } from "../../redux/reduser/misc";
import { Delete, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hook/hook";
import { useDeleteChatMutation, useLeaveGroupMutation } from "../../redux/api/api";
import toast from "react-hot-toast";
const DeleteChatMenu = ({ dispatch, deleteOptionAnchor }) => {
  const navigate=useNavigate();
  const { isDeleteMenu, selecedDeleteChat } = useSelector(
    (state) => state.misc
  );
  const closeHandler = () => {
    dispatch(setDeleteMenu(false));
  };
  // const [deleteChatApi,isLoading] = useAsyncMutation(useDeleteChatMutation);
  const [deleteChatApi]=useDeleteChatMutation()
  const [leaveGroupApi,_,leaveData]=useAsyncMutation(useLeaveGroupMutation);
  const leaveGroup = async() => {
    closeHandler();
    leaveGroupApi("leaving group",selecedDeleteChat.chatId);
  };
  const deleteChat = async() => {
    closeHandler()
    const toastId=toast.loading("deleting chat...");
    try{
      const res=await deleteChatApi(selecedDeleteChat.chatId);
      if(res.data){
        return navigate("/");
      }else{
        toast.error(res?.error?.data?.message || "something went wrong",{id:toastId})
    }
    }
    catch(err){
      console.log(err);
      toast.error(err.data.message ||"something went wrong",{id:toastId})
    }finally{
      toast.dismiss(toastId);
    }  
    deleteOptionAnchor.current=null;
  };
  // useEffect(()=>{
  //   return navigate("/");
  // },[leaveData])
  return (
    <Menu
      anchorEl={deleteOptionAnchor.current}
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={"0.5rem"}
        sx={{
          width: "8.6rem",
          padding: "0.5rem",
          cursor: "pointer",
          borderRadius: "50%",
        }}
        onClick={selecedDeleteChat.groupChat ? leaveGroup : deleteChat}
      >
        {selecedDeleteChat.groupChat ? (
          <>
            <ExitToApp color="error" /> Leave
          </>
        ) : (
          <>
            <Delete color="error" /> Delete
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
