import React,{memo} from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { sampleNotifications } from "../constant/sample";
import { teal } from "../constant/color";
import { scrlBar } from "../constant/color";
import { useDispatch } from "react-redux";
import { setNotification } from "../../redux/reduser/misc";
import { useGetNotificationsQuery } from "../../redux/api/api";
import { useError } from "../../hook/hook";
import { useAcceptFriendRequestMutation } from "../../redux/api/api";


const Notification = () => {
  const diapatch=useDispatch();
  const [acceptRequest] = useAcceptFriendRequestMutation();
  // let isLoading = false;
  const closeHandler = () => {
    diapatch(setNotification(false));
  };

  // fetch data from server
  const {isLoading,data,error,isError} =useGetNotificationsQuery("");
  useError([{isError,error}]);
  // console.log("data",data.allRequest);
  const acceptFriendRequestHandler=async(_id,accept)=>{
    console.log("_id",_id);
    try {
      const res=await acceptRequest({requestId:_id,accept});
      if(res?.data?.success){
        // use socketttttttttttttttttttttttttttttttttttttttttttttttttttttttttt 
        toast.success(res.data.message);
        closeHandler()
      }else{
        toast.error(res.data?.error || "something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      
    }
  }
  return (
    <>
      <Dialog open fullWidth={true} onClose={closeHandler}>
        <Stack
          sx={{
            ...scrlBar,
            maxHeight: "90vh",
            overflow: "auto",
            padding: { xs: "1rem", sm: "2rem" },
          }}
          borderRadius={"10px"}
          // width={{ xs: "80vw", sm: "40vw" }}
          // maxWidth={{ xs: "80vw", sm: "40vw" }}
        >
          <DialogTitle textAlign={"center"} color="primary">
            Notifications
          </DialogTitle>

          {isLoading ? (
            <Skeleton></Skeleton>
          ) : (
            <>
              {" "}
              {data?.allRequest?.length > 0 ? (
                <>
                  {data.allRequest.map(({ sender, _id }) => {
                    return (
                      <NotificationItem
                        sender={sender}
                        _id={_id}
                        key={_id}
                        handler={acceptFriendRequestHandler}
                      ></NotificationItem>
                    );
                  })}
                </>
              ) : (
                <>
                  <Typography textAlign={"center"} color={teal}>
                    No Notifications
                  </Typography>
                </>
              )}
            </>
          )}
        </Stack>
      </Dialog>
    </>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <>
      <ListItem>
        <Stack direction="row" alignItems="center" spacing="1rem" width="100%">
          <Avatar src={avatar}></Avatar>
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
          <Stack direction={{ xs: "column" }}>
            <Button onClick={() => handler(_id, true)}>Accept</Button>
            <Button color="error" onClick={() => handler(_id, false)}>
              Reject
            </Button>
          </Stack>
        </Stack>
      </ListItem>
    </>
  );
});

export default Notification;
