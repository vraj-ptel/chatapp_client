import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFileMenu, setUploadingLoader } from "../../redux/reduser/misc";
import { Image,AudioFile, VideoFile, UploadFile } from "@mui/icons-material";
import {toast} from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({ anchorE1 ,chatId}) => {
  // apii 
  const [sendAttachments]=useSendAttachmentsMutation()
  // refss 
  const imageRef=useRef();
  const audioRef=useRef();
  const videoRef=useRef();
  const fileRef=useRef();

  const { isFileMenu } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  // close file menu
  const closeHandler = () => {
    dispatch(setFileMenu(false));
  };
  // fileChangeHandlerrrrrr
  const fileChangeHandler = async(e, key) => {
    const files = Array.from(e.target.files);
    if(files.length<=0)return;
    if(files.length>5){
      return toast.error(`you can only send 5 ${key} at a time`)
    }  
    dispatch(setUploadingLoader(true));
    const toastId=toast.loading(`uploading ${key}...`)
    closeHandler();
    //fetching here
    try {
      const myForm=new FormData();
      myForm.append("chatId",chatId)
      files.forEach((file)=>myForm.append("files",file));
      const res=await sendAttachments(myForm);
      if (res.data) toast.success(`${key} sent successfully`, { id: toastId });
      else toast.error(`Failed to send ${key}`, { id: toastId });
    } catch (error) {
        toast.error("something went wrong",{id:toastId})
    }finally{
      dispatch(setUploadingLoader(false));
    }

  };
  const selectRef=(ref)=>{
    ref.current?.click();
  }
  return (
    <>
      <Menu open={isFileMenu} anchorEl={anchorE1} onClose={closeHandler}>
        <div style={{ width: "10rem" }}>
          <MenuList>
            <MenuItem onClick={()=>selectRef(imageRef)}>
              <Tooltip title="image">
                <Image color="primary" />
              </Tooltip>
              <ListItemText sx={{ marginLeft: "0.5rem" }}>Image</ListItemText>
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg, image/gif"
                style={{ display: "none" }}
                onChange={(e) => fileChangeHandler(e, "Images")}
                ref={imageRef}
              />
            </MenuItem>
            <MenuItem onClick={()=>selectRef(audioRef)}>
              <Tooltip title="audio">
                <AudioFile color="primary" />
              </Tooltip>
              <ListItemText sx={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
              <input
                type="file"
                multiple
                accept="audio/mpeg, audio/wav"
                style={{ display: "none" }}
                onChange={(e) => fileChangeHandler(e, "Audios")}
                ref={audioRef}
              />
            </MenuItem>
            <MenuItem onClick={()=>selectRef(videoRef)}>
              <Tooltip title="video">
                <VideoFile color="primary" />
              </Tooltip>
              <ListItemText sx={{ marginLeft: "0.5rem" }}>Video</ListItemText>
              <input
                type="file"
                multiple
                accept="video/mp4, video/webm, video/ogg"
                style={{ display: "none" }}
                onChange={(e) => fileChangeHandler(e, "Videos")}
                ref={videoRef}
              />
            </MenuItem>
            <MenuItem onClick={()=>selectRef(fileRef)}>
              <Tooltip title="file">
                <UploadFile color="primary" />
              </Tooltip>
              <ListItemText sx={{ marginLeft: "0.5rem" }}>file</ListItemText>
              <input
                type="file"
                multiple
                accept="*"
                style={{ display: "none" }}
                onChange={(e) => fileChangeHandler(e, "Files")}
                ref={fileRef}
              />
            </MenuItem>
          </MenuList>
        </div>
      </Menu>
    </>
  );
};

export default FileMenu;
