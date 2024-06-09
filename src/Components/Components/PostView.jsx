import React, { useState, useEffect } from "react";
import {
  Alert,
  CircularProgress,
  Container,
  Card,
  Typography,
  Button,
} from "@mui/material";
import useFetchPost from "../../hooks/useFetchPost";

const PostView = ({ postId, onBack }) => {
  const fetchPost = useFetchPost();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchPost(postId);
        setPost(data);
        setStatus("success");
      } catch (error) {
        setError(error.message);
        setStatus("error");
      }
    };
    getPost();
  }, [postId, fetchPost]);

  if (status === "loading") return <CircularProgress />;
  if (status === "error") return <Alert severity="error">{error}</Alert>;

  return (
    <Container
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Button variant="contained" onClick={onBack}>
        Back
      </Button>
      <Card variant="outlined" sx={{ maxWidth: 600, mt: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {post.body}
        </Typography>
      </Card>
    </Container>
  );
};

export default PostView;