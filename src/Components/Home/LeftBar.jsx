import { Container, Typography } from '@mui/material'
import React from 'react'

const LeftBar = () => {
  const menu = ["Posts", "Albums", "Photos", "ToDos"]
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
      <Typography variant="h4">JSONPlaceholder</Typography>
      {menu.map((items) => (
        <div>{items}</div>
      ))}
    </Container>
  );
}

export default LeftBar