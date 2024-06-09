import './App.css';
import Feed from './Components/Home/Feed';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid } from '@mui/material';
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
        <Container >
          <Grid container spacing={{ xs: 0, md: 1 }} sx={{ height: '100vh' }}>

            <Grid item xs={2}>
              <LeftBar />
            </Grid>

            <Grid item xs={7}>
              <Feed />
            </Grid>

            <Grid item xs={3}>
              <RightBar />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
