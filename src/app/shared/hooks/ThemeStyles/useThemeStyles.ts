import { useTheme } from "@mui/material/styles";

const useThemeStyles = () => {
  const theme = useTheme();

  return {
    backgroundDefault: theme.palette.background.default,
    backgroundPaper: theme.palette.background.paper,
    textColor: theme.palette.mode === "dark" ? "white" : "black",
  };
};

export default useThemeStyles;
