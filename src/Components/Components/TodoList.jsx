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
      sx={{ display: "flex", alignItems: "center", flexDirection: "column", p: "0px !important" }}
    >
      {error ? <Alert severity="error">{error}</Alert> : ""}
      {status === "loading" ? (
        <CircularProgress />
      ) : status === "error" ? (
        <Alert severity="error">{error}</Alert>
      ) : data?.pages?.length > 0 ? (
        data.pages.map((page, pageIdx) => (
          <div key={pageIdx}>
            {page.todos.map((todo) => (
              <Card
                key={todo.id}
                variant="outlined"
                sx={{}}
              >
                <Typography gutterBottom variant="h7" component="div">
                  {todo.title}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {todo.completed ? "Completed" : "Pending"}
                </Typography>
              </Card>
            ))}
          </div>
        ))
      ) : (
        <Alert severity="info">No todos available</Alert>
      )}
      <div ref={ref} />
    </Container>
  );
};

export default TodoList;