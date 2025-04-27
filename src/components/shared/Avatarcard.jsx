import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { transformImage } from "../../lib/feactures";

const Avatarcard = ({ avatar = [], max = 4 }) => {
  return (
    <>
      <Stack direction={"row"} spacing={0.5}>
        <AvatarGroup sx={{ position: "relative" }}>
          <Box width={"3rem"} height={"3rem"}>
            {avatar.map((i, index) => (
              <Avatar
              key={index}
                src={transformImage(i, 100)}
                sx={{
                  border: "none",
                  width: "3rem",
                  height: "3rem",
                  position: "absolute",
                  left: {
                    xs: `${0.5 + index}rem`,
                    sm: `${index}rem`,
                  },
                  top: "10%",
                }}
              ></Avatar>
            ))}
          </Box>
        </AvatarGroup>
      </Stack>
    </>
  );
};

export default Avatarcard;
