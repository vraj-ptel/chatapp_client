import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { useFileHandler } from "6pp";
import { Paperr } from "../styles/StyledComponent";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hook/hook";
import { useUpdateProfileMutation } from "../../redux/api/api";
import { userExist } from "../../redux/reduser/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../constant/config";
import { ArrowBack, BackHand } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg.jpg";

const Input = styled("input")({
  display: "none",
});

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const [avatar, setAvatar] = useState(null);
  // const avatarRef = useRef();
  // const [updateProfile] = useUpdateProfileMutation();
  const avatar = useFileHandler("single");
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);
  // const [avatar, setAvatar] = useState(user?.avatar?.url);
  const [isLoading, setIsLoading] = useState(false);

  // const handleAvatarChange =async (e) => {
  //   setAvatar(URL.createObjectURL(e.target.files[0]));

  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name), formData.append("bio", bio);
    const toastId = toast.loading("Updating Profile...");
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      if (data?.user) {
        toast.success(data?.message, { id: toastId });
        dispatch(userExist(data?.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      // maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        minWidth: "100vw",
        overflow: "hidden",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <Stack
        sx={{
          padding: "2rem",
          borderRadius: "40px",
          backgroundColor: "rgba(0, 0, 0, 0.27)",
          backdropFilter: "blur(10px)",
        }}
      >
        <IconButton onClick={() => navigate("/")} sx={{width:"fit-content"}}>
          <ArrowBack />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // mt: 4,
            // p: 3,
            // boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              margin: "2rem",
              width: "30vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={avatar.preview ? avatar.preview : user?.avatar?.url}
              alt="Avatar Preview"
              sx={{ width: 100, height: 100, mt: 2, mb: 2 }}
            />

            <label htmlFor="avatar-upload">
              <Input
                accept="image/*"
                id="avatar-upload"
                type="file"
                onChange={avatar.changeHandler}
              />
              <Button variant="text" component="span">
                Update Avatar
              </Button>
            </label>

            {/* <Avatar
            src={avatar.preview}
            alt="Avatar Preview"
            sx={{ width: 100, height: 100, mt: 2, mb: 2, cursor: "pointer" }}
            onClick={() => avatarRef.current.click()}
          />
          <input
            type="file"
            ref={avatarRef}
            style={{ display: "none" }}
            onChange={avatar.changeHandler}
          /> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="bio"
              label="Bio"
              name="bio"
              multiline
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default UpdateProfile;
