import Applayout from "../components/layout/Applayout";
import {
  AttachFile,
  Send,
  ShoppingCartCheckoutTwoTone,
} from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import MessageCompo from "../components/shared/MessageCompo";
import { scrlBar } from "../components/constant/color";
import { sampleMessage } from "../components/constant/sample";
import { useState, useRef, useEffect, useCallback } from "react";
import FileMenu from "../components/dialog/FileMenu";

import { useInfiniteScrollTop } from "6pp";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../components/constant/event";
import { useGetChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useError, useSocketEvents } from "../hook/hook";
import { useDispatch, useSelector } from "react-redux";
import { setFileMenu } from "../redux/reduser/misc";
import { removeNewMessageAlert } from "../redux/reduser/chat";
import Typing from "../components/layout/Typing";
import { useNavigate } from "react-router-dom";
import img from "../assets/bg2.jpg";
import { getSocket } from "../../socket";


const Chat = ({ chatId }) => {
  const navigate = useNavigate();
  // let isLoading=false;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const i = user._id;

  const socket = getSocket();

  // refss
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const typingTimeOut = useRef(null);
  const bottomRef = useRef(null);

  // use statesss
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setfileMenuAnchor] = useState(null);
  const [iAmTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  // message fetch from database
  const oldMessageChunk = useGetMessagesQuery({ chatId, page });
  useError([
    { isError: oldMessageChunk.isError, error: oldMessageChunk.error },
  ]);

  // get chat details from database
  const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
  const { isError, error, data, isLoading } = chatDetails;
  const members = data?.chat?.members;
  useError([{ isError, error }]);

  //on attachment sent
  const handleFileOpen = (e) => {
    e.preventDefault();
    dispatch(setFileMenu(true));
    setfileMenuAnchor(e.currentTarget);
  };
  // on message typing
  const a = members?.filter((m) => m != i);
  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if (!iAmTyping) {
      socket.emit(START_TYPING, { members: a, chatId });
      setIamTyping(true);
    }
    if (typingTimeOut.current) clearTimeout(typingTimeOut.current);
    typingTimeOut.current = setTimeout(() => {
      setIamTyping(false);
      socket.emit(STOP_TYPING, { members, chatId });
    }, [2000]);
  };
  // on message sent
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // emitting msg to the serverr
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  // listening new messg event from socket
  const newMsgListener = useCallback(
    (data) => {
      // console.log("data for socket", data);
      if (data.chat !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );
  // listing start typing event from the socket
  const startTypinglistener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      // console.log("start typing", data);
      setUserTyping(true);
    },
    [chatId]
  );
  // listing stop typing event from the socket
  const stopTypinglistener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      // console.log("stop typing", data);
      setUserTyping(false);
    },
    [chatId]
  );
  //alert listener
  const alertListener = useCallback(
    (data) => {
      console.log("alerttttttttttttttttttttttttttttttttttttt", data);
      const { message, chat } = data;
      if (chatId != chat) return;
      const messageForAlert = {
        content: message,
        sender: {
          _id: "abcd",
          name: "ADMIN",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );
  const EventArg = {
    [ALERT]: alertListener,
    [START_TYPING]: startTypinglistener,
    [STOP_TYPING]: stopTypinglistener,
    [NEW_MESSAGE]: newMsgListener,
  };

  useSocketEvents(socket, EventArg);
  // const allMessages=[...oldMessageChunk?.data?.messages,...messages];

  // console.log("messages",messages)
  // useEffect(()=>{
  //   socket.on(NEW_MESSAGE,newMsgFun);
  //   return socket.off(NEW_MESSAGE,newMsgFun)
  // },[])

  // infine scroll logic
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessageChunk?.data?.totalPages,
    page,
    setPage,
    oldMessageChunk?.data?.messages
  );
  // console.log("old messages chunk", oldMessages);
  const allMessages = [...oldMessages, ...messages];

  // for setting everthing to its original state when chat id change or another chat get opened
  useEffect(() => {
    dispatch(removeNewMessageAlert({ chatId }));
    return () => {
      setMessages([]);
      setOldMessages([]);
      setPage(1);
      setMessage("");
    };
  }, [chatId]);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    if (isError) {
      return navigate("/");
    }
  }, [isError]);
  return (
    <>
      <div
        style={{
          height: "90%",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
        }}
      >
        <Stack
          ref={containerRef}
          sx={{
            ...scrlBar,
            backgroundColor:'rgba(0, 0, 0, 0.27)',
            backdropFilter:"blur(10px)",
            boxSizing: "border-box",
            padding: "1rem",
            spacing: "1rem",
            height: "100%",
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          {/* {!oldMessageChunk.isLoading &&
          oldMessageChunk?.data?.messages.length > 0 &&
          oldMessageChunk?.data?.messages.map((msg, index) => {
            return (
              <MessageCompo
                key={msg._id}
                message={msg}
                user={user}
              ></MessageCompo>
            );
          })} */}
          {allMessages.length > 0 &&
            allMessages.map((msg, index) => {
              return (
                <MessageCompo
                  key={index}
                  message={msg}
                  user={user}
                ></MessageCompo>
              );
            })}
          {userTyping && <Typing />}
          <div ref={bottomRef} />
        </Stack>

        <form
          style={{ height: "10%" }}
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{
              width: "100%",
              height: "100%",

              position: "relative",
            }}
          >
            <TextField
              id="filled-basic"
              placeholder="Type a message"
              sx={{ width: "100%" }}
              variant="filled"
              value={message}
              onChange={messageOnChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                    <IconButton onClick={(e) => handleFileOpen(e)}>
                      <AttachFile color="primary" />
                    </IconButton>
                    <IconButton type="submit">
                      <Send color="primary" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </form>
        <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
      </div>
    </>
  );
};

export default Applayout()(Chat);
