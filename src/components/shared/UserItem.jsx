import React from "react";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { transformImage } from "../../lib/feactures";

const Useritem = ({ user, handler, handlerIsLoading ,isadded,styling}) => {
    const {name,_id,avatar}=user
    // console.log(user,"userrrrrr");
  return (
    <>
      <ListItem sx={{ ...styling }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{}}
          spacing="1rem"
          width="100%"
        >
          <Avatar src={transformImage(avatar)}></Avatar>
          <Typography
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {name}
          </Typography>
          <IconButton
            size="small"
            sx={{ color: "primary" }}
            onClick={() => handler(_id)}
            disabled={handlerIsLoading}
          >
            {!isadded ? (
              <AddCircle color="primary" />
            ) : (
              <RemoveCircle color="primary" />
            )}
          </IconButton>
        </Stack>
      </ListItem>
    </>
  );
};

export default memo(Useritem);
