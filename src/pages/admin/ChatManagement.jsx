import React from 'react'
import { Avatar, Skeleton, Stack } from "@mui/material";
import Table from '../../components/shared/Table';
import { transformImage } from '../../lib/feactures';
import { useEffect, useState } from "react";
import Avatarcard from '../../components/shared/Avatarcard';
import AdminLayout from '../../components/layout/AdminLayout';
import { sampleTableChats } from '../../components/constant/sample';
import { useGetAdminChatDataQuery } from '../../redux/api/api';


const columns = [
  {
    field: "_id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "name",
    headerName: "NAME",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "avatar",
    headerName: "AVATAR",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <Avatarcard avatar={params.row.avatar} />,
  },
  {
    field: "totalMembers",
    headerName: "TOTAL MEMBERS",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "MEMBERS",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => {
      return (
        <Avatarcard
          max={100}
          avatar={params.row.members}
        />
      );
    },
  },
  {
    field: "totalMessages",
    headerName: "TOTAL MESSAGES",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];
const ChatManagement = () => {
  const {data,isLoading,error,isError}=useGetAdminChatDataQuery();
  const [row,setRows]=useState([]);
  useEffect(()=>{
   if(data){
    setRows( data?.chats.map((c)=>{
      return {
       ...c,
        id:c._id,
        avatar: c.avatar.map((a) => transformImage(a)),
        members:c.members.map((m)=>m.avatar),
        creator: {
          ...c.creater,
          avatar: transformImage(c.creater.avatar),
        },
      }
    }))
   }
  },[data]);
  return isLoading?<><Skeleton/></>: (
   <>
    <AdminLayout>
      <Table row={row} rowHeight={50} column={columns} heading={'ALL CHATS'}  ></Table>
    </AdminLayout>
   </>
  )
}

export default ChatManagement