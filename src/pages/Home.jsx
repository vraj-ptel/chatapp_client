import React from "react";
import Applayout from "../components/layout/Applayout";
import Title from "../components/shared/title";
import { Stack, Typography } from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";

const Home = () => {
  return (
    <>
      <Title title="CHA_T - HOME" />
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <ChatBubbleOutline
          sx={{
            fontSize: "5rem",
            color: "primary",
            backgroundColor: "rgb(162, 210, 255)",
            borderRadius: "10%",
          }}
        />
        <Typography variant="h6" letterSpacing={"5px"} sx={{margin:"1rem"}}>
          Select a Friend To Start Chat
        </Typography>

        {/* dkjfkdjfkdjfds */}
      </Stack>
    </>
  );
};

export default Applayout()(Home);
