import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { sampleTableMessage } from '../../components/constant/sample'
import moment from 'moment'
import { Avatar, Stack,Box, Skeleton } from '@mui/material'
import { fileFormat } from '../../lib/feactures'
import RenderAttachment from '../../components/shared/RenderAttachment'
import { useGetAdminMessageDataQuery } from '../../redux/api/api'
import { useError } from '../../hook/hook'


const columns=[{
  field:"_id",
  headerName:"ID",
  headerClassName:"table-header",
  width: 200
}

  ,{
    field: "content",
    headerName: "CONTENT",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "SEND By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "CHAT",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "groupChat",
    headerName: "GROUP CHAT",
    headerClassName: "table-header",
    width: 100,
    renderCell:(params)=>(
      <span>{params.row.groupChat?"YES":"NO"}</span>
    )
  },
  {
    field: "createdAt",
    headerName: "CREATED AT",
    headerClassName: "table-header",
    width: 250,
  },
  {
    field:"attachments",
    headerName:"ATTACHMENTS",
    headerClassName:"table-header",
    width:250,
    renderCell:(params)=>{
    
     
      const {attachments} =params.row;

      return attachments?.length >0 ?<>
        {attachments.map((a)=>{
          const url=a.url;
          const file=fileFormat(url)
          console.log(file);
          console.log(url)
         return  <Box>
          
          <a href={url} download target="_blank">
            
            <RenderAttachment file={file} url={url} />
          </a>
         </Box>
        })}
      </>:<>"No attachments"</>
      
    }
  }
]

const MessageManagement = () => {
  const {data,isLoading,error,isError}=useGetAdminMessageDataQuery()
  console.log("data0",data)
  useError([{error,isError}])
  const [rows,setRows]=useState([])
  useEffect(()=>{
    if(data){
      setRows(data?.messages.map((m)=>{
        return {
          ...m,
          id:m._id,
          sender:{
            name:m.sender.name,
            avatar:m.sender.avatar
          },
          createdAt:moment(m.createdAt).format(" DD MMMM YYYY , H:MM:SS")
        }
      }))
    }
  },[])
  return isLoading?<Skeleton/>: (
    <>
      <AdminLayout>
        <Table row={rows} column={columns} rowHeight={200} heading={"All Messages"}></Table>
      </AdminLayout>
    </>
  )
}

export default MessageManagement