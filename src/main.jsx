import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { purple, red,teal ,lightGreen} from '@mui/material/colors';
import { lightgreen, metblack, purple as purplee } from "./components/constant/color.js";
import {Provider} from "react-redux"
import store from "./redux/store.js";
import './index.css'

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary:{
      main:teal[200],
      dark: teal[500]
    },
    secondary: {
      light: lightgreen,
      // main: grey["A700"],
      main: metblack,
      dark: teal[400],
      contrastText: teal[400],
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <HelmetProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      <div onContextMenu={(e) => e.preventDefault()}>
      <App />
      </div>
      </ThemeProvider>
    </HelmetProvider>
    </Provider>
  </StrictMode>
);
