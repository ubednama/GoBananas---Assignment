import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const LeftBar = () => {
  const menu = ["Posts", "Albums", "Photos", "Users", "ToDos"]
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
      {menu.map((items) => (
        <Box
          sx={{
            ":hover": { bgcolor: "grey", cursor: "pointer", borderRadius: 2, py: 1 },
            px: 3,
          }}
        >
          {items}
        </Box>
      ))}
    </Container>
  );
}

export default LeftBar