import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import { memo } from "react";
import { teal } from "../constant/color";
import RenderAttachment from "./RenderAttachment";
import { fileFormat } from "../../lib/feactures";
import {motion} from "framer-motion";


const MessageCompo = ({ message, user }) => {
  const { sender, attachments, content, _id, createdAt, chatId } = message;
  const sameSender = sender._id === user._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: '-100%' }}
        whileInView={{ opacity: 1, x: 0 }}
        style={{
          alignSelf: sameSender ? "flex-end" : "flex-start",
          margin: "0.2rem 0",
        }}
      >
        <Stack direction="row" spacing={1}>
        {!sameSender &&(<Avatar src={sender?.avatar?.url}></Avatar>)}
          <Box>
           {!sameSender && (
          <Typography fontWeight="600" color={"primary"}>
            {sender.name}
          </Typography>
        )}
        <div
          style={{
            backgroundColor: "#616161",
            borderRadius: "20px",
            padding: "0.5rem",
            width: "fit-content",
            position: "relative",
            display: "inline-block",
            height: "auto",
          }}
          className="talk-bubble tri-right left-top"
        >
          {content && <Typography>{content}</Typography>}

          {/* attachments  */}
          {attachments && attachments.length > 0 &&
            attachments.map((attachment, index) => {
              const url = attachment.url;
              const file = fileFormat(url);
              return (
                <Box key={index}>
                  <a href={url} target="_blank" download style={{}}>
                    <RenderAttachment file={file} url={url}/>
                  </a>
                </Box>
              );
            })}
          

          <Typography fontWeight={"lighter"} variant="caption">
            {timeAgo}

          </Typography>
        </div>
        </Box>
        </Stack>

      </motion.div>
    </>
  );
};

export default MessageCompo;
