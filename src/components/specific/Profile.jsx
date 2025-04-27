import React from "react";
import moment from "moment";
import { Avatar, Stack, Typography } from "@mui/material";
import { transformImage } from "../../lib/feactures";
import { teal } from "../constant/color";
import { Face, AlternateEmail, CalendarMonth, Abc } from "@mui/icons-material";
import { useSelector } from "react-redux";
const Profile = ({user}) => {
  // const {user}=useSelector(state=>state.auth);
  // console.log(user);
  // let u = {
  //   avatar:
  //     "https://images.unsplash.com/photo-1686548812883-9d3777f4c137?h=400&fit=crop&auto=format&dpr=2",
  //   name: "vraz",
  //   userName: "vraz",
  //   bio: "this is my bio",
  //   createdAt: "2024-11-07T05:19:48.445Z",
  // };

  const { avatar, name, userName, bio, createdAt } = user;

  return (
    <>
      <Stack direction={"column"} spacing={"2rem"} alignItems={"center"} justifyContent={'center'}>
        <Avatar
          sx={{
            objectFit: "contain",
            marginBottom: "1rem",
            border: `1px solid ${teal}`,
            height: 200,
            width: 200,
          }}
          src={transformImage(avatar.url, 200)}
        ></Avatar>
        <Stack alignItems={'flex-start'} spacing={'1rem'}>
        <ProfileCard text={"Bio"} heading={bio} Icon={<Abc />} />
        <ProfileCard
          text={"Username"}
          heading={userName}
          Icon={<AlternateEmail />}
        />
        <ProfileCard text={"Name"} heading={name} Icon={<Face />} />

        <ProfileCard
          heading={"Joined"}
          text={moment(createdAt).fromNow()}
          Icon={<CalendarMonth />}
        />
        </Stack>
      </Stack>
    </>
  );
};
const ProfileCard = ({ text, Icon, heading }) => (
  <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
    {Icon && Icon}
    <Stack direction={"column"} >
      <Typography variant="body1">{text}</Typography>
      <Typography color={teal} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);
// const ProfileCard=({text,Icon,heading}:{text:string,Icon?:React.ReactNode,heading:string})=>(
//   <Stack
//       direction={"row"}
//       alignItems={"center"}
//       spacing={"1rem"}
//       textAlign="center"
//   >

//       {
//           Icon && Icon
//       }
//       <Stack>
//           <Typography variant='body1'>{text}</Typography>
//           <Typography color={purple} variant='caption'>{heading}</Typography>
//       </Stack>
//   </Stack>
// )
export default Profile;
