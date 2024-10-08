import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { fontFamily } from "../../styles/font";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: red[700],
      dark: red[800],
      light: red[500],
      contrastText: "#fff",
    },
    secondary: {
      main: red[900],
      dark: red[900],
      light: red[900],
      contrastText: "#fff",
    },
    background: {
      paper: "#1e1f23",
      default: "#17181c",
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--scrollbar-bg": "#333",
          "--scrollbar-thumb": "#888",
          "--scrollbar-thumb-hover": "#555",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
          borderRadius: "0px",
          border: "1px solid #393a3e",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0a0b0d",
          borderColor: "#393a3e",
          boxShadow: "none",
        },
      },
    },
  },
});
