import { useTheme } from "@mui/material/styles";

const useThemeStyles = () => {
  const theme = useTheme();

  return {
    backgroundDefault: theme.palette.background.default,
    backgroundPaper: theme.palette.background.paper,
    textColor: theme.palette.mode === "dark" ? "white" : "black",
    borderColor:
      theme.palette.mode === "dark" ? "1px solid #393a3e" : "1px solid #e0e0e0",
  };
};

export default useThemeStyles;
