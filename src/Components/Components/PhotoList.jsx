import React, { useEffect } from "react";
import useFetchPhotos from "../../hooks/useFetchPhotos";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import {
  Alert,
  CircularProgress,
  Container,
  Card,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";

const PhotoList = () => {
  const fetchPhotos = useFetchPhotos();

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["photos"],
      queryFn: ({ pageParam }) => fetchPhotos({ pageParam }),
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
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%"}}
    >
      {error && <Alert severity="error">{error}</Alert>}
      {status === "loading" && <CircularProgress />}
      {status === "error" && <Alert severity="error">{error}</Alert>}
      {data?.pages?.length > 0 ? (
        data.pages.map((page, pageIdx) => (
          <Box key={pageIdx} sx={{ width: "100%", mb: 2 }}>
            {page.photos.map((photo) => (
              <Card
                key={photo.id}
                variant="outlined"
                sx={{}}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={photo.thumbnailUrl}
                  alt={photo.title}
                />
                <Typography gutterBottom variant="h6" component="div">
                  {photo.title}
                </Typography>
              </Card>
            ))}
          </Box>
        ))
      ) : (
        <Alert severity="info">No photos available</Alert>
      )}
      <div ref={ref} />
      {isFetchingNextPage && <CircularProgress sx={{ mt: 2 }} />}
    </Container>
  );
};

export default PhotoList;