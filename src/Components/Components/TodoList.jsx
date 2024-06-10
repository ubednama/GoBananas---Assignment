import React, { useEffect } from "react";
import useFetchTodos from "../../hooks/useFetchTodos";
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

const TodoList = () => {
  const fetchTodos = useFetchTodos();

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["todos"],
      queryFn: ({ pageParam }) => fetchTodos({ pageParam }),
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
        justifyContent: "center",
        flexDirection: "column",
        p: "0px !important",
        width: "100%"
      }}
    >
      {error ? <Alert severity="error">{error}</Alert> : ""}
      {status === "loading" ? (
        <CircularProgress />
      ) : status === "error" ? (
        <Alert severity="error">{error}</Alert>
      ) : data?.pages?.length > 0 ? (
        data.pages.map((page, pageIdx) => (
          <div key={pageIdx} style={{ width: "100%" }}>
            {page.todos.map((todo) => (
              <Box key={todo.id} sx={{ width: "100%" }}>
                <Card
                  variant="outlined"
                  sx={{ width: "100%"}}
                >
                  <Typography gutterBottom variant="h7" component="div">
                    {todo.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {todo.completed ? "Completed" : "Pending"}
                  </Typography>
                </Card>
              </Box>
            ))}
          </div>
        ))
      ) : (
        <Alert severity="info">No todos available</Alert>
      )}
      <div ref={ref} />
      {isFetchingNextPage && <CircularProgress />}
    </Container>
  );
};

export default TodoList;