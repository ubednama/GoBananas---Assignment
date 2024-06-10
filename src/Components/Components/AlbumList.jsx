import React, { useEffect } from "react";
import useFetchAlbums from "../../hooks/useFetchAlbums";
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

const AlbumList = () => {
  const fetchAlbums = useFetchAlbums();

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["albums"],
      queryFn: ({ pageParam }) => fetchAlbums({ pageParam }),
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
            {page.albums.map((album) => (
              <Card key={album.id} variant="outlined" sx={{ width: "100%" }}>
                <Typography gutterBottom variant="h6" component="div">
                  {album.title}
                </Typography>
              </Card>
            ))}
          </Box>
        ))
      ) : (
        <Alert severity="info">No albums available</Alert>
      )}
      <div ref={ref} />
    </Container>
  );
};

export default AlbumList;