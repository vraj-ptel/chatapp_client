import React, { useCallback, useEffect, useRef,useState } from "react";
import Title from "../shared/title";
import Header from "./Header";
import Profile from "../specific/Profile";
import { Drawer, Grid, Skeleton } from "@mui/material";
import Chatlist from "../specific/Chatlist";
import { useNavigate, useParams } from "react-router-dom";
import { scrlBar } from "../constant/color";
import { useMyChatQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatId,
  setDeleteMenu,
  setIsMobile,
  setOnlineUsers,
  setSelectedDeleteChat,
} from "../../redux/reduser/misc";
import { useError, useSocketEvents } from "../../hook/hook";
import { getSocket } from "../../../socket";
import {
  IS_ONLINE,
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  REFETCH_CHAT,
} from "../constant/event";
import {
  incrementNotification,
  removeNewMessageAlert,
  setNewMessageAlert,
} from "../../redux/reduser/chat";
import { getOrSave } from "../../lib/feactures";
import toast from "react-hot-toast";
import noti from "../audio/notification.wav";
import { Stack } from "@mui/material";
import DeleteChatMenu from "../dialog/DeleteChatMenu";
const Applayout = () => (WrappedComponent) => {
  return (props) => {
    const notify = new Audio(noti);

    const navigate = useNavigate();
    const deleteMenuAnchor = useRef(null);
    const param = useParams();
    const chatId = param.chatId;
    const dispatch = useDispatch();
    const { isMobile, isDeleteMenu,onlineUsers } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);
   
    
 
    // console.log("new message alert", newMessagesAlert )

    // chat list data fetch
    const { refetch, isError, error, data, isLoading } = useMyChatQuery("");
    // error handleee
    useError([{ isError, error }]);
    // handling functionnn
    // console.log("is delete menu", isDeleteMenu);
    const handleDeleteChat = (e, _id, groupChat) => {
      dispatch(setDeleteMenu(true));
      deleteMenuAnchor.current = e.currentTarget;
      // console.log("delete chat", _id,groupChat);
      dispatch(setSelectedDeleteChat({ chatId: _id, groupChat }));
    };
    const handleMobile = () => {
      dispatch(setIsMobile(false));
    };

    //socket
    const socket = getSocket();
    // console.log("socket", socket);
    //seting chat id to chat reducer to show new message alert
    const newMsgAlertHandler = useCallback(
      (data) => {
        // console.log(data,"data");
        if (chatId === data.chatId) {
          return;
        }

        toast(data?.message ? data.message : "New Message", {
          position: "bottom-right",
          icon: "🔔",
        });
        notify.play();
        dispatch(setNewMessageAlert(data));
      },
      [chatId]
    );
    //new request alert to show new request notifications
    const newRequestAlertHandler = useCallback(() => {
      console.log("new request alert");
      notify.play();
      dispatch(incrementNotification());
    }, [dispatch]);
    //refetch Chat data when something change in chat
    const refetchHandler = useCallback(
      (data) => {
        if (data) {
          notify.play();
          toast(data, {
            icon: "🔔",
          });
        }

        refetch();
        return navigate("/");
      },
      [refetch, navigate]
    );
    const isOnlineHandler = useCallback((data) => {
      // console.log("online friendss");
      // console.log("dataa", data);
      if(data){
        
        const onlineUsers=[]
        
        data.user.forEach((u)=>{
          if(u.toString()!==user?._id.toString()){
            onlineUsers.push(u)
          }
        });
        // console.log("onlineUsers",onlineUsers)
        dispatch(setOnlineUsers(onlineUsers));
      }
    }, []);
    const eventArgs = {
      [IS_ONLINE]: isOnlineHandler,
      [REFETCH_CHAT]: refetchHandler,
      [NEW_MESSAGE_ALERT]: newMsgAlertHandler,
      [NEW_REQUEST]: newRequestAlertHandler,
    };
    useSocketEvents(socket, eventArgs);

    // use Effect to save how many new messages in localstorage
    useEffect(() => {
      getOrSave({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    return (
      <>
        <Title title="home" />
        <Header />
        <DeleteChatMenu
          dispatch={dispatch}
          deleteOptionAnchor={deleteMenuAnchor}
        />
        {isLoading ? (
          <>
            <Skeleton />
          </>
        ) : (
          <>
            <Drawer open={isMobile} onClose={handleMobile}>
              <Chatlist
                w="70vw"
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUser={onlineUsers}
              ></Chatlist>
            </Drawer>
          </>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              maxHeight: "100vh",
              overflow: "auto",
              ...scrlBar,
            }}
            height={"100%"}
          >
            {isLoading ? (
              <>
                <Skeleton />
              </>
            ) : (
              <Chatlist
                chats={data?.chats}
                chatId={chatId}
                onlineUser={onlineUsers}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
              />
            )}
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
            bgcolor={"secondary.main"}
          >
            <WrappedComponent {...props} chatId={chatId} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
            }}
            height={"100%"}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default Applayout;
