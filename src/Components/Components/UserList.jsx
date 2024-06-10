import React, { useEffect } from "react";
import useFetchUsers from "../../hooks/useFetchUsers";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import {
  Alert,
  CircularProgress,
  Container,
  Card,
  Typography,
  Box,
} from "@mui/material";

const UserList = () => {
  const fetchUsers = useFetchUsers();

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: ({ pageParam = 1 }) => fetchUsers({ pageParam }),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasNextPage ? allPages.length + 1 : undefined,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage]);

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0px !important",
      }}
    >
      {error ? <Alert severity="error">{error}</Alert> : ""}
      {status === "loading" ? (
        <CircularProgress />
      ) : status === "error" ? (
        <Alert severity="error">{error}</Alert>
      ) : data?.pages?.length > 0 ? (
        data.pages.map((page, pageIdx) => (
          <Box key={pageIdx} sx={{ width: "100%" }}>
            {page.users.map((user) => (
              <Card
                key={user.id}
                variant="outlined"
                sx={{ width: "100%" }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {user.name}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {user.email}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        ))
      ) : (
        <Alert severity="info">No users available</Alert>
      )}
      <div ref={ref} />
      {isFetchingNextPage && <CircularProgress />}
    </Container>
  );
};

export default UserList;