import {
  AppBar,
  Box,
  IconButton,
  useTheme,
  Tooltip,
  Avatar,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import logoClosed from "../../../assets/close-menu.png";

import logoOpen from "../../../assets/open-menu.png";
import { IChildrenProps } from "../../@types";
import { useResponsiveContent } from "../../hooks";
import { useDrawerContext, useThemeContext } from "../../contexts";
import styles from "./navBar.module.scss";

export const NavBar: React.FC<IChildrenProps> = ({ children }) => {
  const theme = useTheme();
  const { toggleTheme } = useThemeContext();
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const marginLeft = useResponsiveContent();

  return (
    <AppBar
      sx={{
        height: theme.spacing(8),
        borderBottom:
          theme.palette.mode === "light"
            ? "1px solid #e0e0e0"
            : "1px solid #393a3e",
      }}
    >
      <Box className={styles.boxMain}>
        <Box sx={{ marginLeft: marginLeft }}>
          <IconButton onClick={toggleDrawerOpen}>
            <img
              style={{ width: theme.spacing(5), height: theme.spacing(5) }}
              src={isDrawerOpen ? logoClosed.src : logoOpen.src}
              alt={isDrawerOpen ? "Fechar menu" : "Abrir menu"}
            />
          </IconButton>
        </Box>
        <Box className={styles.boxUser}>
          <Tooltip title="Alterar tema">
            <IconButton onClick={toggleTheme} color="primary">
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Tooltip>
          <Typography variant="body1" sx={{ margin: "0 8px" }}>
            {"Usuário"} {/* corrigir para pegar o nome do usuário logado */}
          </Typography>
          <Tooltip title="Minha conta">
            <IconButton color="primary">
              <Avatar />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box
        sx={{
          marginLeft: marginLeft,
          marginTop: theme.spacing(2),
        }}
      >
        {children}
      </Box>
    </AppBar>
  );
};
