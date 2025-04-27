import { MenuOutlined, CloseSharp, Padding } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "../styles/StyledComponent";
import {
  Dashboard,
  Person,
  ExitToApp,
  Message,
  Group,
} from "@mui/icons-material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { scrlBar } from "../constant/color";
import { useDispatch, useSelector } from "react-redux";
import { adminLogOut } from "../../redux/thunks/admin";

export const adminTabs = [
    {
      name: "dashboard",
      path: "/admin/dashboard",
      icon: <Dashboard color="primary"></Dashboard>,
    },
    {
      name: "user",
      path: "/admin/user",
      icon: <Person color="primary"></Person>,
    },
    {
      name: "chat",
      path: "/admin/chat",
      icon: <Group color="primary"></Group>,
    },
    {
      name: "messages",
      path: "/admin/message",
      icon: <Message color="primary"></Message>,
    },
  ];

const AdminLayout = ({ children }) => {
  const {isAdmin}=useSelector(state=>state.auth);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [isMobile, setIsMObile] = useState(false);
//   handle mobileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
  const handleMobile = () => {
    setIsMObile((prev)=>!prev)
  };
   //HANDLE LOGOUTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
   const logOutHandler = () => {
    dispatch(adminLogOut())
   };
  // IF NOT ADMINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN

 useEffect(()=>{
  if (!isAdmin) {
    // return <Navigate to={"/admin"}/>
    return navigate("/admin");
  }
 },[])
  
// SIDEBAR COMPONENTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
const SideBar = ({ w = "100%" }) => {
    const location = useLocation();
    return (
      <>
        <Stack
          sx={{
            width: w,
            direction: "column",
            padding: "3rem",
            spacing: "3rem",
          }}
        >
          <Typography textTransform={"uppercase"} color="primary" variant="h3">
            Annayat
          </Typography>

          {/* SIDE BAR ALL LINKSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS  */}
          <Stack spacing={"1rem"} sx={{ padding: "1rem" }}>
            {adminTabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                sx={{
                  borderRadius: "1rem",
                  transition: "all 0.3s ease-in-out",
                  boxShadow:
                    location.pathname === tab.path
                      ? "0 0 0.5rem rgb(128, 203, 196)"
                      : "none",
                  "&:hover": { boxShadow: "0 0 0.5rem rgb(128, 203, 196)" },
                }}
              >
                <Stack direction="row" spacing={"1rem"} alignItems={"center"}>
                  {tab.icon}
                  <Typography
                    sx={{
                      fontSize: { xs: "0.9rem", md: "160%" },
                      textTransform: "Capitalize",
                      color:
                        location.pathname === tab.path
                          ? "primary.main"
                          : "inherit",
                    }}
                  >
                    {tab.name}
                  </Typography>
                </Stack>
              </Link>
            ))}

            {/* LOG OUTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT  */}

            <Stack
              direction="row"
              spacing={"1rem"}
              alignItems={"center"}
              onClick={logOutHandler}
              sx={{
                borderRadius: "1rem",
                transition: "all 0.3s ease-in-out",
                "&:hover": { boxShadow: "0 0 0.5rem rgb(128, 203, 196)" },
                padding: "1rem",
                cursor: "pointer",
              }}
            >
              <ExitToApp color="primary" />
              <Typography
                sx={{
                  fontSize: { xs: "0.9rem", md: "160%" },
                  textTransform: "Capitalize",
                  color:
                    location.pathname === "/admin/logout"
                      ? "primary.main"
                      : "primary.light",
                }}
              >
                Logout
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  };
  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            position: "fixed",
            right: "1rem",
            top: "1rem",
          }}
        >
          <IconButton color="inherit" onClick={handleMobile}>
            {isMobile ? (
              <>
                <CloseSharp color="primary" />
              </>
            ) : (
              <>
                <MenuOutlined color="primary" />
              </>
            )}
          </IconButton>
        </Box>
        <Grid
          item
          md={4}
          lg={3}
          sx={{ display: { xs: "none", md: "block" } }}
        >
            <SideBar/>
        </Grid>
        <Grid
          item
          md={8}
          lg={9}
          xs={12}
          sx={{
            backgroundColor: "secondary.main",
            padding: "0",
            height: "100vh",
            maxHeight: "100vh",
            overflow:'auto',
            ...scrlBar
          }}
        >
          {children}
        </Grid>
        {/* DRAWER FOR SMALL SCRENNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN  */}
        <Drawer open={isMobile} onClose={handleMobile}>
          <SideBar w={"70vw"} />
        </Drawer>
      </Grid>
    </>
  );
};


export default AdminLayout;
