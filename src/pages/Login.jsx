import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  Box
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
      // console.log(data);
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
    console.log("hello");
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
    // console.log(formData)
    const toastId = toast.loading("Please wait...");
    setLoginLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      // console.log(data)
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
    <>
      <Container
        component={"main"}
        
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          
        }}
      >
        <Paper
          elevation={3}
          
          sx={{
            padding: 4,
            display: "flex",
    
            borderRadius: "10px",
            alignItems: "center",
            xs:{ width: "100%", flexDirection: "column" },
            sm: { width: "100%", flexDirection: "row" },
          }}
        >
          <Box 
            sx={{margin:'4rem'}}
          >
            <ChatBubbleOutline
              sx={{
                fontSize: "5rem",
                color: "primary",
                backgroundColor: "rgb(162, 210, 255)",
                borderRadius: "10%",
              }}
            />
            <Typography variant="h3" color="main">
              Join Annayat
            </Typography>
            <Typography variant="h6" sx={{ color: "GrayText" }}>
              To Get Started
            </Typography>
            </Box>
            <Box 
            sx={{margin:'4rem'}}
          >
              {isLogin ? (
                <>
                  <form
                    onSubmit={(e) => {
                      loginProfile(e);
                    }}
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
                      label={"UserName"}
                      margin="normal"
                      variant="outlined"
                      onChange={userName.changeHandler}
                      value={userName.value}
                    ></TextField>
                    <TextField
                      required
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      label={"Password"}
                      margin="normal"
                      variant="outlined"
                      onChange={password.changeHandler}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ cursor: "pointer" }}
                          >
                            {showPassword ? (
                              <VisibilityOff
                                color="primary"
                                onClick={handleShowPassword}
                              ></VisibilityOff>
                            ) : (
                              <Visibility
                                color="primary"
                                onClick={handleShowPassword}
                              ></Visibility>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>

                    <Button
                      color="primary"
                      type="submit"
                      variant="outlined"
                      sx={{ margin: "1rem 0", width: "100%" }}
                      disabled={loginLoading}
                    >
                      Login
                    </Button>
                    <Typography textAlign={"center"} color="GrayText">
                      Don't have an account?
                      <Button
                        variant="text"
                        color="primary"
                        type="submit"
                        onClick={toggleLogin}
                        disabled={loginLoading}
                      >
                        Register
                      </Button>
                    </Typography>
                  </form>
                </>
              ) : (
                <>
                  <form
                    onSubmit={(e) => {
                      registerProfile(e);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Stack
                      position={"relative"}
                      width={"10rem"}
                      margin={"auto"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: "5rem",
                          height: "5rem",
                          cursor: "pointer",
                        }}
                        src={avatar.preview}
                        onClick={() => avatarRef.current.click()}
                      ></Avatar>
                      <input
                        type="file"
                        onChange={avatar.changeHandler}
                        style={{ display: "none" }}
                        ref={avatarRef}
                      ></input>
                    </Stack>

                    <TextField
                      required
                      fullWidth
                      label={"UserName"}
                      onChange={userName.changeHandler}
                      margin="normal"
                      variant="outlined"
                    ></TextField>
                    {userName.error ? (
                      <Typography color="error">{userName.error}</Typography>
                    ) : (
                      ""
                    )}
                    <TextField
                      required
                      fullWidth
                      label={"name"}
                      onChange={name.changeHandler}
                      margin="normal"
                      variant="outlined"
                    ></TextField>
                    <TextField
                      required
                      fullWidth
                      label={"Bio"}
                      onChange={bio.changeHandler}
                      margin="normal"
                      variant="outlined"
                    ></TextField>
                    <TextField
                      required
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      onChange={password.changeHandler}
                      label={"Password"}
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ cursor: "pointer" }}
                          >
                            {showPassword ? (
                              <VisibilityOff
                                color="primary"
                                onClick={handleShowPassword}
                              ></VisibilityOff>
                            ) : (
                              <Visibility
                                color="primary"
                                onClick={handleShowPassword}
                              ></Visibility>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>
                    {password.error ? (
                      <Typography color="error">{password.error}</Typography>
                    ) : (
                      ""
                    )}

                    <Button
                      color="primary"
                      type="submit"
                      variant="outlined"
                      sx={{ margin: "1rem 0" }}
                      disabled={loginLoading}
                      fullWidth
                    >
                      Register
                    </Button>
                    <Typography textAlign={"center"} color="GrayText">
                      Already have an account?
                      <Button
                        variant="text"
                        color="primary"
                        type="submit"
                        onClick={toggleLogin}
                        // sx={{ margin: "1rem 0" }}
                        disabled={loginLoading}
                      >
                        Login
                      </Button>
                    </Typography>
                  </form>
                </>
              )}
              </Box>
           
        </Paper>
      </Container>
    </>
  );
};

export default Login;
