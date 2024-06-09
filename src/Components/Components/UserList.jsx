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
} from "@mui/material";

const UserList = () => {
  const fetchUsers = useFetchUsers();

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: ({ pageParam }) => fetchUsers({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.hasNextPage ? allPages.length + 1 : undefined;
        return nextPage;
      },
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
        flexDirection: "column",
        p: "0px !important",
      }}
    >
      {error ? <Alert severity="error">{error}</Alert> : ""}
      {status === "loading" ? (
        <CircularProgress />
      ) : status === "error" ? (
        <Alert severity="error">{error}</Alert>
      ) : data?.pages?.length > 0 ? (
        data.pages.map((page, pageIdx) => (
          <div key={pageIdx}>
            {page.users.map((user) => (
              <Card key={user.id} variant="outlined" sx={{}}>
                <Typography gutterBottom variant="h7" component="div">
                  {user.name}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {user.email}
                </Typography>
              </Card>
            ))}
          </div>
        ))
      ) : (
        <Alert severity="info">No users available</Alert>
      )}
      <div ref={ref} />
    </Container>
  );
};

export default UserList;