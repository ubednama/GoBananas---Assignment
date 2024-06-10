import './App.css';
import Feed from './Components/Home/Feed';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Grid } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LeftBar from './Components/Home/LeftBar';
import RightBar from './Components/Home/RightBar';

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container sx={{ display: "flex", padding: "0px !important", }}>
          <Box sx={{display: {xs: "none", sm: "block"} , width: "20%"}}>
            <LeftBar />
          </Box>
          <Box sx={{width: "50%"  }}>
            <Feed />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" }, width: "30%"}}>
            <RightBar />
          </Box>
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
