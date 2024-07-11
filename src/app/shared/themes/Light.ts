import { createTheme } from "@mui/material";
import { cyan, red } from "@mui/material/colors";
import { fontFamily } from "../styles/font";

export const LightTheme = createTheme({
  palette: {
    mode: "light",
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
      paper: "#fff",
      default: "#f7f6f3",
    },
    text: {
      primary: "#000000",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
          borderRadius: "0px",
          border: "1px solid #e0e0e0",
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
          color: "#000",
          fontFamily: fontFamily,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          borderColor: "#e0e0e0",
          boxShadow: "none",
        },
      },
    },
  },
});
