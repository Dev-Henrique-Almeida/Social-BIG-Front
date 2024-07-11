import { createTheme } from "@mui/material";
import { cyan, red } from "@mui/material/colors";
import { fontFamily } from "../styles/font";

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
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
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
