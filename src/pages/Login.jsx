import {
  Avatar,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  Box,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {
  CameraAlt,
  Visibility,
  VisibilityOff,
  ChatBubbleOutline,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { VisullyHiddenInput } from "../components/styles/StyledComponent";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { userNameValidator } from "../utils/Validator";
import axios from "axios";
import { server } from "../components/constant/config";
import { useDispatch, useSelector } from "react-redux";
import { userExist } from "../redux/reduser/auth";
import toast from "react-hot-toast";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const avatarRef = useRef();

  const [loginLoading, setLoginLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const userName = useInputValidation("", userNameValidator);
  const password = useStrongPassword();
  const avatar = useFileHandler("single");

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  const loginProfile = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const toastId = toast.loading("Please wait...");
    setLoginLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        { userName: userName.value, password: password.value },
        config
      );
      dispatch(userExist(data.user));
      toast.success("Login successfully", { id: toastId });
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setLoginLoading(false);
    }
  };
  
  const registerProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("userName", userName.value);
    formData.append("password", password.value);
    formData.append("bio", bio.value);
    formData.append("avatar", avatar.file);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const toastId = toast.loading("Please wait...");
    setLoginLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExist(data.user));
      toast.success("Register successfully", { id: toastId });
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: isMobile ? 1 : 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: isMobile ? 2 : 4,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        <Box 
          sx={{
            margin: isMobile ? "1rem 0" : "4rem",
            textAlign: "center",
            width: isMobile ? "100%" : "auto"
          }}
        >
          <ChatBubbleOutline
            sx={{
              fontSize: isMobile ? "3rem" : "5rem",
              color: "primary",
              backgroundColor: "rgb(162, 210, 255)",
              borderRadius: "10%",
              margin: "0 auto",
            }}
          />
          <Typography variant={isMobile ? "h4" : "h3"} color="main">
            Join Annayat
          </Typography>
          <Typography variant={isMobile ? "body1" : "h6"} sx={{ color: "GrayText" }}>
            To Get Started
          </Typography>
        </Box>
        
        <Box 
          sx={{
            margin: isMobile ? "1rem 0" : "4rem",
            width: isMobile ? "100%" : "50%",
            minWidth: isMobile ? "auto" : "300px"
          }}
        >
          {isLogin ? (
            <form
              onSubmit={loginProfile}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                required
                fullWidth
                label="UserName"
                margin="normal"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                onChange={userName.changeHandler}
                value={userName.value}
              />
              <TextField
                required
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                margin="normal"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                onChange={password.changeHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                      <IconButton onClick={handleShowPassword} edge="end">
                        {showPassword ? (
                          <VisibilityOff color="primary" />
                        ) : (
                          <Visibility color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                color="primary"
                type="submit"
                variant="contained"
                sx={{ margin: "1rem 0", width: "100%" }}
                disabled={loginLoading}
                size={isMobile ? "small" : "medium"}
              >
                Login
              </Button>
              <Typography textAlign="center" color="GrayText">
                Don't have an account?{" "}
                <Button
                  variant="text"
                  color="primary"
                  onClick={toggleLogin}
                  disabled={loginLoading}
                  size="small"
                >
                  Register
                </Button>
              </Typography>
            </form>
          ) : (
            <form
              onSubmit={registerProfile}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Stack
                position="relative"
                width={isMobile ? "8rem" : "10rem"}
                margin="auto"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: isMobile ? "4rem" : "5rem",
                    height: isMobile ? "4rem" : "5rem",
                    cursor: "pointer",
                  }}
                  src={avatar.preview}
                  onClick={() => avatarRef.current.click()}
                />
                <input
                  type="file"
                  onChange={avatar.changeHandler}
                  style={{ display: "none" }}
                  ref={avatarRef}
                />
              </Stack>

              <TextField
                required
                fullWidth
                label="UserName"
                onChange={userName.changeHandler}
                margin="normal"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              />
              {userName.error && (
                <Typography color="error">{userName.error}</Typography>
              )}
              <TextField
                required
                fullWidth
                label="Name"
                onChange={name.changeHandler}
                margin="normal"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                required
                fullWidth
                label="Bio"
                onChange={bio.changeHandler}
                margin="normal"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                required
                fullWidth
                type={showPassword ? "text" : "password"}
                onChange={password.changeHandler}
                label="Password"
                margin="normal"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                      <IconButton onClick={handleShowPassword} edge="end">
                        {showPassword ? (
                          <VisibilityOff color="primary" />
                        ) : (
                          <Visibility color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {password.error && (
                <Typography color="error">{password.error}</Typography>
              )}

              <Button
                color="primary"
                type="submit"
                variant="contained"
                sx={{ margin: "1rem 0" }}
                disabled={loginLoading}
                fullWidth
                size={isMobile ? "small" : "medium"}
              >
                Register
              </Button>
              <Typography textAlign="center" color="GrayText">
                Already have an account?{" "}
                <Button
                  variant="text"
                  color="primary"
                  onClick={toggleLogin}
                  disabled={loginLoading}
                  size="small"
                >
                  Login
                </Button>
              </Typography>
            </form>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;