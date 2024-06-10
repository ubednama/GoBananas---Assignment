import React, { useState} from "react";
import {Container, Button, Typography } from "@mui/material";
import UserList from "../Components/UserList";
import AlbumList from "../Components/AlbumList";
import PhotoList from "../Components/PhotoList";
import TodoList from "../Components/TodoList";
import PostView from "../Components/PostView";
import PostList from "../Components/PostList";

const Feed = () => {
  const [view, setView] = useState("Posts");
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleBack = () => {
    setView("Posts");
    setSelectedPostId(null);
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: { xs: 1 },
        padding: "0px !Important",
        height: "100vh",
      }}
    >
      <Container sx={{ display: { sm: "none" } }}>
        <Button variant="contained" onClick={() => setView("Users")}>
          Users
        </Button>
        <Button variant="contained" onClick={() => setView("Albums")}>
          Albums
        </Button>
        <Button variant="contained" onClick={() => setView("Photos")}>
          Photos
        </Button>
        <Button variant="contained" onClick={() => setView("ToDos")}>
          Todos
        </Button>
        <Button variant="contained" onClick={() => setView("Posts")}>
          All Posts
        </Button>
      </Container>
      <Typography>{view}</Typography>
      <Container sx={{ overflowY: "auto", p: "0px !Important" }}>
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