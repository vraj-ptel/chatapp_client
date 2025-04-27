import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Button,
  Container,
  Paper,
  Stack,
  Avatar,
  Typography,
  Box,
  TextField,
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
import Table from "../../components/shared/Table";
import { sampleTableUser } from "../../components/constant/sample";
import { transformImage } from "../../lib/feactures";
import { useGetAdminUserDataQuery } from "../../redux/api/api";
import { useError } from "../../hook/hook";

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
    width: 200,
  },
  {
    field: "avatar",
    headerName: "AVATAR",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "userName",
    headerName: "USERNAME",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "FRIENDS",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "GROUPS",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "updatedAt",
    headerName: "UPDATED AT",
    headerClassName: "table-header",
    width: 200,
  },
];
const UserManagement = () => {
  const { data, isError, error, isLoading } = useGetAdminUserDataQuery();
  useError([{ isError, error }]);
  // console.log(data);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if(data){
      setRows(
        data?.users.map((u) => {
          return {
            ...u,
            updatedAt: moment(u.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
            id: u._id,
            avatar: transformImage(u.avatar,50),
          };
        })
      );
    }
  }, [data]);
  return isLoading?<><Skeleton/></>:(
    <>
      <AdminLayout>
        <Table
          rowHeight={50}
          row={rows}
          column={columns}
          heading={"All Users"}
        ></Table>
      </AdminLayout>
    </>
  );
};

export default UserManagement;
