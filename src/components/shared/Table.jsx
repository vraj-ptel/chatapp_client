import React from "react";
import { Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { Paperr } from "../styles/StyledComponent";
import { scrlBar } from "../constant/color";
const Table = ({ row, column, heading, rowHeight = 32 }) => {
  return (
    <>
      <Container sx={{ height: "100vh" }}>
        <Paperr
          sx={{
            padding: "1rem 4rem",
            borderRadius: "1rem",
            margin: "auto",
            width: "100%",
            overflow: "auto",
            height: "100%",
          }}
        >
          <Typography textAlign={"center"} variant={"h4"} color={"primary"}>
            {heading}
          </Typography>
          <DataGrid
            rows={row}
            columns={column}
            rowHeight={rowHeight}
            style={{ height: "80%" }}
            sx={{
              border: "none",
              overflow: "auto",
              ".table-header": {
                backgroundColor: "rgba( 205, 180, 219,0.2)",
                // boxShadow: "0 0 0.2rem rgb( 205, 180, 219)",
                borderBottom: "1px solid rgb( 205, 180, 219)",
              },
            }}
          ></DataGrid>
        </Paperr>
      </Container>
    </>
  );
};

export default Table;
