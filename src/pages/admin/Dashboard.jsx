import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Box,
  TextField,
  IconButton,
  Skeleton,
} from "@mui/material";
import {
  AdminPanelSettings,
  Groups3Outlined,
  Message,
  Notifications,
  Person3,
} from "@mui/icons-material";
import moment from "moment";
import { scrlBar, teal } from "../../components/constant/color";
import { Paperr } from "../../components/styles/StyledComponent";
import { LineChart,DoughnutChart } from "../../components/specific/Charts";
import {useFetchData} from '6pp'
import { server } from "../../components/constant/config";
import { useGetAdminStatsQuery } from "../../redux/api/api";
import { useError } from "../../hook/hook";

const Dashboard = () => {
  // const {loading,data,error} = useFetchData(`${server}/api/v1/admin/stats`,"dashboard-stats")
  const {data,isLoading,error,isError}=useGetAdminStatsQuery();
  const errorArray=[{isError,error}]
  useError(errorArray);
  const {msg,stats}=data || {};
   // console.log("data",data);
  // appbarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
  const AppBar = () => (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
        boxShadow: "0 0 0.2rem  rgb(128, 203, 196)",
      }}
    >
      <Stack direction="row" spacing={"1rem"} alignItems={"center"}>
        <IconButton>
          {" "}
          <AdminPanelSettings color="primary" />
        </IconButton>
        <TextField
          placeholder="Search"
          variant="outlined"
          sx={{ boxShadow: "0 0 0.5rem rgb(128, 203, 196)", border: "none" }}
        />
        <Button color="primary">search</Button>
        <Box flexGrow={1}></Box>
        <Typography sx={{ display: { xs: "none", md: "block" } }}>
          {moment().format("MMMM DD YYYY")}
        </Typography>
        <IconButton sx={{ cursor: "pointer" }}>
          <Notifications color={"primary"} />
        </IconButton>
      </Stack>
    </Paper>
  );
  // widgettttttttttttttttttttttttttttttttttttttttttttttttt
  const Widget = () => (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        spacing={"2rem"}
      >
        <WidgetPaper title={"user"} value={stats?.userCounts} icon={<Person3 />} />
        <WidgetPaper title={"chat"} value={stats?.totalChatsCount} icon={<Groups3Outlined />} />
        <WidgetPaper title={"messages"} value={stats?.messagesCounts} icon={<Message />} />
      </Stack>
    </>
  );
  return isLoading?<Skeleton/>: (
    <>
      <AdminLayout>
        <Container
          component={"main"}
          sx={{
            ...scrlBar,
            width: "100%",
            maxWidth: "100%",
            minWidth: "100%",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <AppBar />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={"1%"}
            flexWrap={"wrap"}
            width={"100%"}
              sx={{
                padding: "2rem 0",
              }}
          >
            <Paperr
              sx={{
                padding: "1rem",
                borderRadius: "1rem",
                width: { xs: "100%", sm: "60%" },
                maxWidth: { xs: "100%", sm: "60%" },
                boxShadow: "0 0 0.2rem rgb(128, 203, 196)",
                borderBottom: "1px solid rgb(128, 203, 196)",
                
                
              }}
            >
              <Typography>Last Messages</Typography>
              <LineChart value={msg} />
            </Paperr>
            {/* paper for dounght charttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt */}
            <Paperr
              elevation={3}
              sx={{
                padding: "1rem",
                borderRadius: "1rem",
                width: { xs: "100%", sm: "40%" },
                maxWidth: { xs: "100%", sm: "calc(40% - 1%)" },
                dispay: "flex",
                justifyContent: "center",
                alignItems: "center",
                position:'relative',
                // height:'20rem'
              }}
            >
              {/* {"dougnout chart"} */}
              <DoughnutChart
                value={[stats?.groupsCounts || 0,stats?.totalChatsCount - stats?.groupsCounts || 0]}
                labels={["GroupChat", "SingleChat"]}
              />  
              <Stack
                direction="row"
                sx={{
                  // backgroundColor: "white",
                  
                  position: "absolute",
                  direction: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  spacing: "0.5rem",
                  top:'50%',
                  left:'50%',
                  transform:'translate(-50%,-50%)'
                  // width: "100%",
                  // height: "100%",
                }}
              >
                <Groups3Outlined color="primary" />
                <Typography>Vs</Typography>
                <Person3 sx={{color:"rgba(255, 99, 132)"}} />
              </Stack>
            </Paperr>
          </Stack>
          {/* WIDGETTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT  */}
          <Widget />
        </Container>
      </AdminLayout>
    </>
  );
};
// widgetttttttttttttttttttttpaperrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
const WidgetPaper = ({ title, value, icon }) => {
  return (
    <>
      <Paperr
        sx={{
          padding: "2rem",
          margin: "2rem 0",
          borderRadius: "1.5rem",
          width: "20rem",
        }}
      >
        <Stack alignItems={"center"} spacing={"1rem"}>
          <Typography
            sx={{
              color: teal,
              borderRadius: "50%",
              border: `5px solid ${teal}`,
              width: "5rem",
              height: "5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {value}
          </Typography>
          <Stack alignItems={"center"} spacing={"1rem"}>
            {icon}
            <Typography>{title}</Typography>
          </Stack>
        </Stack>
      </Paperr>
    </>
  );
};
export default Dashboard;
