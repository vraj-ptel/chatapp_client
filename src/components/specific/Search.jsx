import React from "react";
import { SearchOutlined } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useInputValidation } from "6pp";
import Useritem from "../shared/Useritem";
import { sampleUser } from "../constant/sample";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../redux/reduser/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { useAsyncMutation } from "../../hook/hook";
import { scrlBar } from "../constant/color";

const Search = () => {
  // const [isSearch,setIsSearch]=useState(s);
  const { isSearch } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const [searchUser] = useLazySearchUserQuery();
  // const [sendFriendRequest]=useSendFriendRequestMutation()
  const [sendFriendRequest, isLoading] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const search = useInputValidation("");
  const [user, setUser] = useState([]);
  const [addedUser, setAddedUser] = useState([]);

  // tempppppp

  // let isLoading=false;

  const searchCloseHandler = () => {
    // setIsSearch(false)
    dispatch(setSearch(false));
  };
  const addFriendHandle = async (_id) => {
    setAddedUser((prev) =>
      prev.includes(_id) ? prev.filter((i) => i != _id) : [...prev, _id]
    );
    // try{
    //   const res=await sendFriendRequest({userId:_id});
    //   // console.log(data);
    //   if(res?.data){
    //     toast.success("request sent")
    //     console.log(res.data);
    //   }else{
    //     toast.error(res?.error?.data?.message || "something went wrong")
    //   }

    // }catch(err){
    //   console.log(err);
    //   toast.error('something went wrong')
    // }
    await sendFriendRequest("sending friend request...", { userId: _id });
  };

  // useEffect
  useEffect(() => {
    // searchUser()
    const timeOutId = setTimeout(async () => {
      console.log(search.value);
      try {
        const { data } = await searchUser(search.value);
        console.log(data);
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);
  return (
    <>
      <Dialog open={isSearch} fullWidth={true} onClose={searchCloseHandler}>
        <Stack
          p={"2rem"}
          direction={"column"}
          borderRadius={"10px"}
          sx={{
            padding: "2rem",
            direction: "column",
            borderRadius: "10px",
            ...scrlBar,
            overflowY: "auto",
          }}
          // width={{ xs: "80vw", sm: "40vw" }}
          // maxWidth={{ xs: "80vw", sm: "40vw" }}
        >
          <DialogTitle textAlign={"center"} color="primary">
            Find People
          </DialogTitle>
          <TextField
            label="search"
            value={search.value}
            onChange={search.changeHandler}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined color="primary" />
                </InputAdornment>
              ),
            }}
          >
            {" "}
          </TextField>

          <List>
            {user?.map((user) => {
              return (
                <Useritem
                  key={user._id}
                  user={user}
                  handler={addFriendHandle}
                  handlerIsLoading={isLoading}
                  isadded={addedUser.includes(user._id)}
                ></Useritem>
              );
            })}
          </List>
        </Stack>
      </Dialog>
    </>
  );
};

export default Search;
