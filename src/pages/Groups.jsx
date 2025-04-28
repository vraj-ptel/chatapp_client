import React, { useState, useEffect, lazy, Suspense } from "react";
import img from "../assets/bg3.jpg";
import AddMemberDialog from "../components/dialog/AddMemberDialog";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
// import UserItem from "../components/shared/UserItem";

import {
  KeyboardBackspaceSharp,
  Menu,
  Edit,
  Done,
  AddSharp,
  DeleteSharp,
} from "@mui/icons-material";
import { Link } from "../components/styles/StyledComponent";
import Applayout from "../components/layout/Applayout";
import { scrlBar, teal } from "../components/constant/color";
import Title from "../components/shared/title";
import { useNavigate, useSearchParams } from "react-router-dom";
import Avatarcard from "../components/shared/Avatarcard";
import { sampleChats } from "../components/constant/sample";
import { useAddMembersMutation, useDeleteChatMutation, useGetChatDetailsQuery, useMyGroupQuery, useRemoveMemberMutation, useRenameGroupMutation } from "../redux/api/api";
import { useAsyncMutation, useError } from "../hook/hook";
import Loader from "../components/layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setAddMember } from "../redux/reduser/misc";
import Useritem from "../components/shared/Useritem";


const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialog/ConfirmDeleteDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const dispatch=useDispatch()
  const { isAddMember}=useSelector(state=>state.misc);
  const navigate = useNavigate("/");

  const myGroups=useMyGroupQuery("");
  const groupDetails=useGetChatDetailsQuery({chatId,populate:true},{skip:!chatId})
  const [renameGroup,isLoadingGroupName]=useAsyncMutation(useRenameGroupMutation)
  const [removeMember,isLoadingRemoveMember]=useAsyncMutation(useRemoveMemberMutation);
  const [deleteGroup,isLoadingDeleteGroup]=useAsyncMutation(useDeleteChatMutation);
  // const [addMember,isLoadingAddMember]=useAsyncMutation(useAddMembersMutation);
  // console.log("group detaills",groupDetails)

  // console.log("mygroups",myGroups);
  //use statess
  const [isMobile, setIsMobile] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [updatedGroupName, setUpdatedGroupName] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [members,setMembers]=useState([])

  // temppppppppppppppppppppp
 
   // !temparoryyyyyyyyyyyyyyyyyy
  //  const [isMember, setIsMember] = useState(false);
  //  const [member, setMember] = useState([]);


  //use Error
  const errorsArray=[{isError:myGroups.isError,error:myGroups.error},{isError:groupDetails.isError,error:groupDetails.error}]
  useError(errorsArray)

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const handleMobileClose = () => {
    setIsMobile(false);
  };
  // update group nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
  const updateGroupNameHandler = () => {
    setIsEdit(false);
    renameGroup("Updating Group Name",{name:updatedGroupName,chatId})
  };

  // open and close dialog handlerrrrrrrrrrrrrrrrrr
  const openDeleteGroupHandler = () => {
    
    setConfirmDeleteDialog(true);
  };
  const closeDeleteGroupHandler = () => {
    setConfirmDeleteDialog(false);
  };
  const openAddMembersHandler = () => {
    console.log("add Member");
    dispatch(setAddMember(true))
    // !tempppppppppppppppppppppppppppppppppppppppppppppppppppp
    // setIsMember((prev)=>!prev);
  };

  // delete group handlerrrrrrrrrrrrrrrrrrrrrr
  const deleteGroupHandler = () => {
    deleteGroup("deleting group",chatId)
    setConfirmDeleteDialog(false);
    return navigate("/group");
  };
  // removeMemberHandlerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
  const removeMemberHandler = (userId) => {
    removeMember("removing member",{chatId,userId})
    console.log("remove member");
  };

  // useEffecttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
  useEffect(()=>{
    if(groupDetails?.data){
      setGroupName(groupDetails?.data?.chat?.name)
      setUpdatedGroupName(groupDetails?.data?.chat?.name);
      setMembers(groupDetails?.data?.chat?.members)
    }
    return ()=>{
      setGroupName("")
      setMembers([]);
      setUpdatedGroupName("");
      setIsEdit(false)
    }
  },[groupDetails?.data])
  // useEffect(() => {
  //   setGroupName(`Group Name ${chatId}`);
  //   setUpdatedGroupName(`Group Name ${chatId}`);

  //   return () => {
  //     setGroupName("");
  //     setUpdatedGroupName("");
  //     setIsEdit(false);
  //   };
  // }, [chatId]);

  // .jsx elementtttttttttttttttttttttttttttttttttttttttt
  // iconbtn componentttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
  const IconBtn = () => {
    return (
      <>
        <IconButton
          sx={{
            display: { xs: "block", sm: "none" },
            position: "fixed",
            right: "1rem",
            top: "1rem",
          }}
          onClick={handleMobile}
        >
          <Menu color="primary" />
        </IconButton>
        <Tooltip title="Back">
          <IconButton
            sx={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
            }}
            // onClick={() => window.history.back()}
            onClick={() => navigate("/")}
          >
            <KeyboardBackspaceSharp color="primary" />
          </IconButton>
        </Tooltip>
      </>
    );
  };
  // groupnameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
  const GroupName = () => {
    return (
      <>
        {chatId && (
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"1rem"}
          >
            {isEdit ? (
              <>
                <TextField
                  label={"Edit"}
                  color="primary"
                  value={updatedGroupName}
                  onChange={(e) => setUpdatedGroupName(e.target.value)}
                ></TextField>
                <IconButton onClick={updateGroupNameHandler} disabled={isLoadingGroupName}>
                  <Done color="primary" />
                </IconButton>
              </>
            ) : (
              <>
                <Typography
                  variant="h4"
                  color="primary"
                  textTransform={"capitalize"}
                >
                  {groupName}
                </Typography>
                <IconButton onClick={() => setIsEdit(true)} disabled={isLoadingGroupName}>
                  <Edit color="primary" />
                </IconButton>
              </>
            )}
          </Stack>
        )}
      </>
    );
  };
  // buttongrouppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp
  const ButtonGroup = () => {
    return (
      <>
        <Stack
          direction={{ xs: "row", sm: "row" }}
          spacing={"1rem"}
          p={{ sm: "1rem", xs: "0", md: "1rem 4rem" }}
        >
          <Button sx={{ width: "fit-content" }} onClick={openAddMembersHandler}>
            Add Members <AddSharp color="primary" />
          </Button>
          <Button
            sx={{ width: "fit-content" }}
            color="error"
            onClick={openDeleteGroupHandler}
          >
            Delete Group <DeleteSharp color="error" />
          </Button>
        </Stack>
      </>
    );
  };
  return myGroups.isLoading?<><Loader/></>: (
    <>
      <Title title="CHA_T - Groups" />
      <Grid container height={"100vh"}>
        <Grid item sm={4} sx={{ display: { xs: "none", sm: "block" },maxHeight:'100vh' ,overflow:'auto' }}>
          <GroupList myGroup={myGroups?.data?.groups} chatId={chatId} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          // bgcolor={"secondary.main"}
          sx={{
            backgroundImage:`url(${img})`,
            backgroundSize:"cover"
          }}
        >
          <div
             style={{
              backgroundColor:'rgba(0, 0, 2, 0.37)',
              backdropFilter:"blur(20px)",
              display: "flex",
              alignItems: "center",
              position: "relative",
              flexDirection: "column",
              padding: "1rem 3rem",
              height: "100vh",
              overflow: "auto",
            }}
          >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "20%",
            }}
          >
            {groupName && <GroupName />}
          </Box>
          {/* : {membersssssssssssssssssssssssssssssssss} */}
          <Stack
            width={"100%"}
            sx={{ ...scrlBar }}
            boxSizing={"border-box"}
            padding={{ sm: "1rem", xs: "1rem", md: "1rem 4rem" }}
            spacing={"2rem"}
            height={"60%"}
            alignItems={"center"}
            overflow={"auto"}
          >
            {/* IF CHAT ID EXIST THAN ONLY MEMBERS WILL BE SHOWNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN */}
            {chatId ? (
              <>
                {isLoadingRemoveMember?<CircularProgress/>: members.length > 0 ? (
                  <>
                    {members.map((user, index) => {
                      return (
                        <Useritem
                          key={user._id}
                          user={user}
                          isadded={true}
                          handler={removeMemberHandler}
                          styling={{
                            boxShadow: "0 0 0.5rem rgb(128, 203, 196)",
                            borderRadius: "1rem",
                            width: "100%",
                            // width: {xs:'100%',sm:'80%'},
                          }}
                        />
                      );
                    })}
                  </>
                ) : (
                  <Typography>No Members</Typography>
                )}
              </>
            ) : (
              <>
                <Typography>Please Select a Group to View Members</Typography>
              </>
            )}
          </Stack>

          {/* <Typography>Members</Typography> */}
          <Box
            height={"20%"}
            maxHeight={"20%"}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            {chatId && <ButtonGroup />}
          </Box>
          <IconBtn />
          </div>
        </Grid>
        {/* add memeber dialog boxxxxxxxxxxxx */}
        {isAddMember && (
          <Suspense fallback={<Backdrop open={true} />}>
            <AddMemberDialog

              chatId={chatId}
              
            />
          </Suspense>
        )}
        {/* deletedialoggggggggggggggggggggggggggggggggggggggggggggggggg  */}
        {confirmDeleteDialog && (
          <Suspense fallback={<Backdrop />}>
            <ConfirmDeleteDialog
              open={confirmDeleteDialog}
              handleClose={closeDeleteGroupHandler}
              deleteHandler={deleteGroupHandler}
            />
          </Suspense>
        )}
        {/* drawerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr */}
        <Drawer
          open={isMobile}
          onClose={handleMobileClose}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <GroupList myGroup={myGroups?.data?.groups} w="75vw" chatId={chatId} />
        </Drawer>
      </Grid>
    </>
  );
};

const GroupList = ({ w = "100%", myGroup = [], chatId }) => {
  return (
    <>
      <Stack
        width={w}
        spacing={"2rem"}
        padding={"2rem"}
        sx={{
          ...scrlBar,
          maxHeight: "100%",
          overflow: "auto",
        }}
      >
        {myGroup.length > 0 ? (
          <>
            {myGroup.map((grp, index) => {
              return <GroupListItem group={grp} chatId={chatId} key={index} />;
            })}
          </>
        ) : (
          <Typography
            textAlign={"center"}
            variant="h5"
            color={teal}
            padding={"2rem"}
          >
            No Groups
          </Typography>
        )}
      </Stack>
    </>
  );
};
const GroupListItem = ({ group, chatId }) => {
  const { name, avatar, _id } = group;
  const curId = useSearchParams()[0].get("group");

  return (
    <>
      <Link
        to={`?group=${_id}`}
        onClick={(e) => {
          if (chatId === _id) e.preventDefault();
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            padding: { xs: "5%", sm: "3%" },
            boxShadow: "0 0 0.5rem rgb(128, 203, 196)",
            borderRadius: "1rem",
            transition: "all 0.3s ",
            border: curId === _id ? "0.1rem solid rgb(128, 203, 196)" : "none",
            "&:hover": {
              border: "0.1rem solid rgb(128, 203, 196)",
            },
          }}
        >
          <Avatarcard avatar={avatar} max={4}></Avatarcard>
          <Typography color="primary">{name}</Typography>
        </Stack>
      </Link>
    </>
  );
};
export default Groups;
