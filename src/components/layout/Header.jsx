import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  Backdrop,
  Badge,
} from "@mui/material";
import {
  Add,
  Group,
  MenuOutlined,
  Search as Srch,
  Logout,
  LogoutOutlined,
  Notifications,
  Person,
  ChatBubbleOutline
} from "@mui/icons-material";
import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = lazy(() => import("./../specific/Search"));
const Notification = lazy(() => import("./../specific/Notification"));
const NewGroup = lazy(()=>import("../specific/Newgroup"))
// const NewGroup = lazy(() => import("./../specific/NewGroup"));
import axios from "axios";
import { server } from "../constant/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExist } from "../../redux/reduser/auth";
import { setIsMobile, setNewGroup, setNotification, setSearch } from "../../redux/reduser/misc";
import { resetNotification } from "../../redux/reduser/chat";

const Header = () => {
  const navigate = useNavigate();
  // const [isMobile, setIsMobile] = useState(false);
  // const [isSearch, setIsSearch] = useState(false);
  // const [isNewGroup, setIsNewGroup] = useState(false);
  // const [isNotification, setIsNotification] = useState(false);

  const dispatch = useDispatch()
  const {isMobile,isSearch,isNotification,isNewGroup}=useSelector((state)=>state.misc)
  const {  notificationCount}=useSelector((state)=>state.chat)

  const handleMobile = () => {
    // setIsMobile((prev) => !prev);
    dispatch(setIsMobile(true))
  };
  const openSearchDialog = () => {
    // setIsSearch((prev) => !prev);
    dispatch(setSearch(true));
  };
  const openNewGroup = () => {
    // setIsNewGroup((prev) => !prev);
    dispatch(setNewGroup(true));
  };
  //updateProfileee
  const openUpdateProfile = () => {
    navigate("/update");
  };
  const navigateGroup = () => {
    navigate("/group");
  };
  const logOutHandler = async() => {
    console.log('logout');
   try {
      const {data}= await axios.get(`${server}/api/v1/user/logout`,{withCredentials:true});
      console.log(data);
      dispatch(userNotExist(false));
      toast.success(data.message);
   } catch (error) {
      console.log(error);
      toast.error('failed to logout');
   }
  };
  const notificationHandler = () => {
    // setIsNotification((prev) => !prev);
    dispatch(setNotification(true))
    dispatch(resetNotification());
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
          <Toolbar>
            <ChatBubbleOutline
                      sx={{
                       
                        color: "primary",
                        // backgroundColor: "rgb(162, 210, 255)",
                      
                      }}
                    />
            {/* <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
            {"   "}  CHA_T
            </Typography> */}
            <Tooltip title="menu" sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                {" "}
                <MenuOutlined />
              </IconButton>
            </Tooltip>

            <Box sx={{ flexGrow: 1 }}></Box>
            <Box>
              <Tooltip title="search">
                <IconButton color="inherit" onClick={openSearchDialog}>
                  {" "}
                  <Srch />
                </IconButton>
              </Tooltip>

              <Tooltip title="new Group">
                <IconButton color="inherit" onClick={openNewGroup}>
                  {" "}
                  <Add />
                </IconButton>
              </Tooltip>


              <Tooltip title="update Profile">
                <IconButton color="inherit" onClick={openUpdateProfile}>
                  {" "}
                  <Person />
                </IconButton>
              </Tooltip>

              <Tooltip title="manage Group">
                <IconButton color="inherit" onClick={navigateGroup}>
                  {" "}
                  <Group />
                </IconButton>
              </Tooltip>

              <Tooltip title={"logout"}>
                <IconButton color="inherit" onClick={logOutHandler}>
                  {" "}
                  <LogoutOutlined />
                </IconButton>
              </Tooltip>

              <Tooltip title={"notifications"}>
                <IconButton color="inherit" onClick={notificationHandler}>
                  {" "}
                  {notificationCount ? <Badge badgeContent={notificationCount} color="error"><Notifications /></Badge>:<Notifications />}
                  
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          {" "}
          <Search  />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          {" "}
          <Notification />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          {" "}
          <NewGroup/>
        </Suspense>
      )}
    </>
  );
};

export default Header;
