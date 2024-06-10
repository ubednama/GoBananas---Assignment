import { Box, Container, Typography } from "@mui/material";
import React from "react";

const LeftBar = ({ setView }) => {
  const menu = ["Posts", "Albums", "Photos", "Users", "ToDos"];
  return (
    <Container
      sx={{
        display: { xs: "none", sm: "block" },
        b: "1px solid gray",
        borderRadius: "10px",
        marginTop: "5rem",
        textAlign: "right",
      }}
    >
      <Typography variant="h5">JSON Placeholder</Typography>
      {menu.map((item, index) => (
        <Box
          key={index}
          onClick={() => setView(item)}
          sx={{
            ":hover": {
              bgcolor: "grey",
              cursor: "pointer",
              borderRadius: 2,
              py: 1,
            },
            px: 3, py: '1px',
          }}
        >
          {item}
        </Box>
      ))}
    </Container>
  );
};

export default LeftBar;