import Header from "./components/Header";
import "./App.css";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Stack,
  styled,
  ThemeProvider,
} from "@mui/material";
import Filters from "./components/Filters";
import Characters from "./pages/Characters";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { teal, deepPurple, deepOrange } from "@mui/material/colors";
import useLocalStorageState from "./hooks/useLocalStorageState";
import { Mode, ThemeColor } from "./types";

const StyledAppLayout = styled(Box)(() => ({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  height: "100vh",
}));

const App = () => {
  const colors = [teal, deepPurple, deepOrange];
  const [colorIndex, setColorIndex] = useLocalStorageState<ThemeColor>(
    "color",
    ThemeColor.TEAL
  );
  const [mode, setMode] = useLocalStorageState<Mode>("mode", "light");
  const theme = createTheme({
    palette: {
      mode: mode,
      primary: colors[colorIndex],
    },
  });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <StyledAppLayout>
          <Header setColorIndex={setColorIndex} setMode={setMode} mode={mode} />
          <Stack overflow={"scroll"} py={2}>
            <Container>
              <Filters />
              <Characters />
            </Container>
          </Stack>
        </StyledAppLayout>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
