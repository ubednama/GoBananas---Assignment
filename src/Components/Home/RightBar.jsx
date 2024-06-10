import { Box, Container, Typography } from "@mui/material";
import React from "react";
import UserList from "../Components/UserList";
import TodoList from "../Components/TodoList";
import { grey } from "@mui/material/colors";

const RightBar = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "0px !important",
        ml: 2,
        mt: 1,
        height: "80vh",
        maxHeight: "800px",
        minHeight: "750px",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          flex: "1",
          borderRadius: "10px",
          border: "1px solid",
          borderColor: grey["700"],
          marginBottom: "1rem",
        }}
      >
        <Typography sx={{ textAlign: "center", my: 1 }}>Users</Typography>
        <Box
          sx={{
            overflowY: "auto",
            borderTop: "1px solid",
            borderColor: grey["700"],
            height: "100%",
            px: 1,
          }}
        >
          <UserList />
        </Box>
      </Box>

      <Box
        sx={{
          overflow: "hidden",
          flex: "1",
          borderRadius: "10px",
          border: "1px solid",
          borderColor: grey["700"],
        }}
      >
        <Typography sx={{ textAlign: "center", my: 1 }}>ToDos</Typography>
        <Box
          sx={{
            overflowY: "auto",
            borderTop: "1px solid",
            borderColor: grey["700"],
            height: "100%",
            px: 1,
          }}
        >
          <TodoList />
        </Box>
      </Box>
    </Container>
  );
};

export default RightBar;