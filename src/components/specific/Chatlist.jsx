import { Stack } from "@mui/material";
import React from "react";
import Chatitem from "../shared/Chatitem";

const Chatlist = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUser=[],
  newMessagesAlert = [{ chatId: "", count: 0 }],
  handleDeleteChat
}) => {
  
  // console.log("chat listttts",onlineUser)
  return (
    <>
      <Stack width={w} direction={'column'}>
        {
          chats?.map((data,index)=>{
            const { avatar, _id, name, groupChat, members } = data;
            // console.log("memberss",members)
            const n = newMessagesAlert.find(
              ({ chatId }) => chatId === _id
            );
           
            const isOnline = members?.some((member) =>
              onlineUser.includes(member)
            );
            // console.log(isOnline)
            return <Chatitem
              newMessageAlert={n}
              isOnline={isOnline}
              key={index}
              _id={_id}
              groupChat={groupChat}
              index={index}
              name={name}
              avatar={avatar}
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
            ></Chatitem>
          })
        }
      </Stack>
    </>
  );
};

export default Chatlist;
