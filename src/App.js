import './App.css';
import Feed from './Components/Home/Feed';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LeftBar from './Components/Home/LeftBar';
import RightBar from './Components/Home/RightBar';
import React, { useState } from 'react';

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [view, setView] = useState("Posts");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container sx={{ display: "flex", padding: "0px !important" }}>
          <Box sx={{ display: { xs: "none", sm: "block" }, width: "20%" }}>
            <LeftBar setView={setView} />
          </Box>
          <Box sx={{ width: {sm:"50%"} }}>
            <Feed view={view} setView={setView} />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" }, width: "30%" }}>
            <RightBar />
          </Box>
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;