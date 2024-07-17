import { useTheme } from "@mui/material";
import { useDrawerContext } from "../../contexts";

export const useResponsiveContent = () => {
  const theme = useTheme();
  const { isDrawerOpen } = useDrawerContext();

  return isDrawerOpen ? theme.spacing(46) : theme.spacing(1);
};
