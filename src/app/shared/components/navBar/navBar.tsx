"use client";
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
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import { useRouter } from "next/navigation";

export const NavBar: React.FC<IChildrenProps> = ({ children }) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const router = useRouter();
  const { toggleTheme } = useThemeContext();
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const marginLeft = useResponsiveContent();

  const handleProfile = () => {
    router.push("/perfil");
  };

  const getAvatarProps = () => {
    if (user && user.image) {
      return { src: user.image, alt: user.name };
    }
    return {
      alt: user ? user.name : "Desconhecido",
      src: user ? user.name : "",
    };
  };

  return (
    <Box sx={{ height: "100vh", overflow: "auto" }}>
      <AppBar
        sx={{
          height: theme.spacing(8),
          paddingTop: theme.spacing(0.5),
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
              {user ? user.name : "Desconhecido"}
            </Typography>
            <Tooltip title="Minha conta">
              <IconButton
                onClick={handleProfile}
                color="primary"
                sx={{ marginRight: theme.spacing(2) }}
              >
                <Avatar {...getAvatarProps()} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </AppBar>

      <Box
        sx={{
          paddingTop: theme.spacing(10),
          paddingRight: theme.spacing(3.3),
          maxWidth: "100%",
          overflowX: "hidden",
          wordBreak: "break-all",
          color: theme.palette.mode === "light" ? "#000" : "#fff",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
