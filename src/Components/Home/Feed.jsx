import React, { useState } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import UserList from "../Components/UserList";
import AlbumList from "../Components/AlbumList";
import PhotoList from "../Components/PhotoList";
import TodoList from "../Components/TodoList";
import PostView from "../Components/PostView";
import PostList from "../Components/PostList";

const Feed = ({ view, setView }) => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const menu = ["Posts", "Albums", "Photos", "Users", "ToDos"];

  const handleBack = () => {
    setView("Posts");
    setSelectedPostId(null);
  };

  return (
    <Container
      sx={{
        overflowY: "auto",
        p: "0px !Important",
        width: {xs: "100vw"},
        height: "100vh",
      }}
    >
      <Container
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "space-between",
        }}
      >
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
                px: 2,
              },
              py: "1px",
            }}
          >
            {item}
          </Box>
        ))}
      </Container>
      <Typography>{view}</Typography>
      <Container
        sx={{ overflowY: "auto", p: "0px !Important"}}
      >
        {view === "Posts" && selectedPostId && (
          <PostView postId={selectedPostId} onBack={handleBack} />
        )}
        {view === "Users" && <UserList />}
        {view === "Albums" && <AlbumList />}
        {view === "Photos" && <PhotoList />}
        {view === "ToDos" && <TodoList />}
        {view === "Posts" && <PostList />}
      </Container>
    </Container>
  );
};

export default Feed;