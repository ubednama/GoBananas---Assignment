import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import {
  Alert,
  CircularProgress,
  Container,
  Card,
  Typography,
  Box,
  Divider,
} from "@mui/material";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/posts?_limit=100`);
        setPosts(res.data);
        setStatus("success");
      } catch (error) {
        setError(error.message);
        setStatus("error");
      }
    };
    fetchPosts();
  }, []);

  if (status === "loading") return <CircularProgress />;
  if (status === "error") return <Alert severity="error">{error}</Alert>;

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id} variant="outlined" sx={{}}>
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {post.body}
              </Typography>
            </Box>
            <Divider />
          </Card>
        ))
      ) : (
        <Alert severity="info">No posts available</Alert>
      )}
    </Container>
  );
};

export default PostList;