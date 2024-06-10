import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import {
  Alert,
  CircularProgress,
  Container,
  Card,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import useFetchPosts from "../../hooks/useFetchPosts";

const PostList = () => {
  const fetchPosts = useFetchPosts();

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam }),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasNextPage ? allPages.length + 1 : undefined,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage]);

  if (status === "loading") return <CircularProgress />;
  if (status === "error") return <Alert severity="error">{error}</Alert>;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0px !important",
      }}
    >
      {data?.pages?.length > 0 ? (
        data.pages.map((page, pageIdx) => (
          <div key={pageIdx}>
            {page.posts.map((post) => (
              <Card key={post.id} variant="outlined" sx={{ width: "100%" }}>
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
            ))}
          </div>
        ))
      ) : (
        <Alert severity="info">No posts available</Alert>
      )}
      <div ref={ref} />
      {isFetchingNextPage && <CircularProgress />}
    </Container>
  );
};

export default PostList;