

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Button,
  Typography,
  Skeleton,

} from "@mui/material";
import React, { useEffect, useState } from "react";
import { sampleChats } from "../constant/sample";
import Useritem from "../shared/Useritem";
import { scrlBar } from "../constant/color";
import { useDispatch, useSelector } from "react-redux";
import { setAddMember } from "../../redux/reduser/misc";
import { useAsyncMutation, useError } from "../../hook/hook";
import { useAddMembersMutation, useAvailableFriendsQuery } from "../../redux/api/api";

const AddMemberDialog = ({  chatId }) => {
    const dispatch=useDispatch();
    const { isAddMember}=useSelector(state=>state.misc);

    const {data,isError,error,isLoading}=useAvailableFriendsQuery(chatId)
    // console.log("data",data);
    const [addMembers,isLoadingAddMember]=useAsyncMutation(useAddMembersMutation)
    const errorArr=[{isError,error}]
    useError(errorArr);


    // use statesssssssssssssssssssssssssssssss 
    // const [members, setMembers] = useState(sampleChats);
    // const [isOpen,setIsOpen]=useState(false)
    const [selectedMembers, setSelectedMembers] = useState([]);
   

    const selectMemberHandler = (_id) => {
       
        setSelectedMembers((prev) =>
          prev.includes(_id) ? prev.filter((i) => i !== _id) : [...prev, _id]
        );
       
      };
      console.log(selectedMembers);
  //   on submit of add memberrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
  const addMemberSubmitHandler = () => {
    // call addmemberrrrrrrrrrrr
  addMembers("Adding Members ...",{chatId,members:selectedMembers})
  };
  const closeAddMember = () => {
  
    setSelectedMembers([]);
    // setMembers([]);
   
    dispatch(setAddMember(false))

  };

  return (
    <>
           <Dialog open={isAddMember} onClose={ closeAddMember} fullWidth={true} >
        <Stack

          bgcolor={"secondary.main"}
          p={"2rem"}  spacing={"2rem"}
          maxHeight={'90vh'}
          
          sx={{...scrlBar,overflow:'auto'}}
          // width={{ xs: "25rem", sm: "40vw" }}
          // maxWidth={{ xs: "100vw", sm: "40vw" }}
          // direction={"column"}
          // alignItems={"center"}
          // justifyContent={"center"}
         
          
        >
          <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
          <Stack spacing={"1rem"} width={"100%"}>
            {isLoading?<Skeleton/>: data?.friends.length > 0 ? (
              <>
                {data?.friends.map((user, index) => {
                  // console.log(user);
                  return (
                    <Useritem
                      user={user}
                      key={index}
                      handler={selectMemberHandler}
                      handlerIsLoading={false}
                      isadded={selectedMembers.includes(user._id )}
                    />
                  );
                })}
              </>
            ) : (
              <Typography color={"primary.main"} textAlign={"center"}>
                No Friends
              </Typography>
            )}
          </Stack>
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-around"}
          >
            <Button color="error" onClick={closeAddMember}>
              Cancel
            </Button>
            <Button
              disabled={isLoadingAddMember}
              onClick={addMemberSubmitHandler}
            >
              Add
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default AddMemberDialog;
