import {
  Dialog,
  DialogTitle,
  Button,
  Stack,
  TextField,
  List,
  Typography,
  Skeleton,
} from "@mui/material";
import { useInputValidation } from "6pp";
import React, { useState } from "react";
import { sampleUser } from "../constant/sample";
// import Useritem from "../shared/Useritem";

import { useDispatch,useSelector } from "react-redux";
import { useAvailableFriendsQuery, useCreateGroupMutation } from "../../redux/api/api";
import { useAsyncMutation, useError } from "../../hook/hook";
import { setNewGroup } from "../../redux/reduser/misc";
import toast from "react-hot-toast";
import { scrlBar } from "../constant/color";
import UserItems from "../shared/UserItems";


const Newgroup = ({ n }) => {
  const dispatch = useDispatch();
  const {isNewGroup}=useSelector((state)=>state.misc)
  const [members,setMembers]=useState([])
  const newGroupName = useInputValidation("");
 
  const {isError,error,data,isLoading}=useAvailableFriendsQuery("");
  // console.log("data friends",data);
  //use error
  useError([{isError,error}])
 
  const [newGroupCreate,isLoadingNewGroup]=useAsyncMutation(useCreateGroupMutation)
  // let isLoading=false;
  const closeHandler = () => {
    // setNewGroup(false);
    dispatch(setNewGroup(false));
  };
  const selectMemberHandler=(_id)=>{
    setMembers((prev)=>prev.includes(_id)?prev.filter((i)=>i!=_id):[...prev,_id])
  }
  const createGroupHandler=async()=>{
    if(!newGroupName.value){
      return toast.error("group name is required")
    }
    if(members.length < 2){
      return toast.error("please select atlest 3 members")
    }
    newGroupCreate("creating new group...",{
      name:newGroupName.value,
      members,
    });
    closeHandler();
  }
  return (
    <>
      <Dialog open={isNewGroup} fullWidth={true} onClose={closeHandler}>
        <Stack
          sx={{
            padding: "2rem",
            direction: "column",
            borderRadius: "10px",
            ...scrlBar,
            overflowY: "auto",
          }}
        >
          <DialogTitle color="primary">New Group</DialogTitle>
          <TextField
            label={"Group Name"}
            value={newGroupName.value}
            onChange={newGroupName.changeHandler}
          ></TextField>
          <List>
            {isLoading?<Skeleton/>: data?.friends?.map((user) => {
              return (
                <UserItems
                  key={user._id}
                  user={user}
                  handler={selectMemberHandler}
                  handlerIsLoading={isLoading}
                  isadded={members.includes(user._id)}
                ></UserItems>
              );
            })}
          </List>
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-around"}
          >
            <Button color="error" onClick={closeHandler}>Cancel</Button>
            <Button onClick={ createGroupHandler}>Create</Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default Newgroup;
