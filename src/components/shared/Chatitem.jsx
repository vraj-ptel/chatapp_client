import React, { memo } from "react";
// import { Link } from "react-router-dom";
import { Link } from "../styles/StyledComponent";
import { Box, Stack, Typography } from "@mui/material";                                                                                     
import {
  darkgrey,
  lightgrey,
  purple,
  white,
  whitepink,
  darkgreen,
  lightgreen,
  teal
} from "../constant/color";
import Avatarcard from "./Avatarcard";
import {motion} from "framer-motion";

const Chatitem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <>
      <Link to={`/chat/${_id}`}
        onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}
      >
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{delay: index*0.1}}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1rem",
            backgroundColor: sameSender ? `${lightgrey}` : `${darkgrey}`,
           
            color: sameSender ? `${darkgrey}` : `${lightgrey}`,
            borderBottom: `1px solid ${teal}`,
            justifyContent: "space-between",
            borderRadius: "10px",
            position: "relative",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {/* avatar of user  */}
          <Avatarcard avatar={avatar} max={4} />

          <Stack>
            <Typography>{name}</Typography>
            {newMessageAlert && (
              <Typography>{newMessageAlert.count} New Message</Typography>
            )}
          </Stack>

          {isOnline && (
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: `${teal}`,
                position: "absolute",
                right: "1rem",
                top: "20%",
                // transform: "translateY(-50%)",
              }}
            />
          )}
        </motion.div>
      </Link>
    </>
  );
};

export default memo(Chatitem);
