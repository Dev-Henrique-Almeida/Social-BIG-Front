import { useTheme } from "@mui/material";
import cardImageDark from "../../../assets/card-padrao.png";
import cardImageLight from "../../../assets/card-padrao-light.png";
import cardDetailsDark from "../../../assets/card-details.png";
import cardDetailsLight from "../../../assets/card-details-light.png";

const useThemeStyles = () => {
  const theme = useTheme();

  return {
    backgroundDefault: theme.palette.background.default,
    backgroundPaper: theme.palette.background.paper,
    textColor: theme.palette.mode === "dark" ? "white" : "black",
    borderColor:
      theme.palette.mode === "dark" ? "1px solid #393a3e" : "1px solid #e0e0e0",
    cardImage: theme.palette.mode === "dark" ? cardImageDark : cardImageLight,
    cardDetails:
      theme.palette.mode === "dark" ? cardDetailsDark : cardDetailsLight,
  };
};

export default useThemeStyles;
