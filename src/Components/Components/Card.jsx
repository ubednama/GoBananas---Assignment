import React from "react";
import {Typography, Box, Divider, Paper } from "@mui/material";

const CardComponent = ({ post, onClick }) => {
  return (
    <Paper variant="outlined" sx={{ maxWidth: 360, mb: 2 }} onClick={onClick}>
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {post.body}
        </Typography>
      </Box>
      <Divider />
    </Paper>
  );
};

export default CardComponent;