import {
  AppBar,
  Box,
  IconButton,
  useTheme,
  Tooltip,
  Avatar,
  Typography,
} from "@mui/material";
import { IChildrenProps } from "../../@types";
import { useResponsiveContent } from "../../hooks";
import { useDrawerContext } from "../../contexts";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import { useRouter } from "next/navigation";
import ChangeTheme from "../ChangeTheme/changeTheme";
import useAvatarProps from "../../hooks/AvatarProps/useAvatarProps";
import useFirstAndLastName from "../../hooks/FirstAndLastName/useFirstAndLastName";
import logoClosed from "../../../assets/close-menu.png";
import logoOpen from "../../../assets/open-menu.png";
import styles from "./navBar.module.scss";

export const NavBar: React.FC<IChildrenProps> = ({ children }) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const router = useRouter();
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const marginLeft = useResponsiveContent();
  const getAvatarProps = useAvatarProps();

  const handleProfile = () => {
    router.push("/perfil");
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
            <Tooltip title={isDrawerOpen ? "Fechar Menu" : "Abrir Menu"}>
              <IconButton onClick={toggleDrawerOpen}>
                <img
                  style={{ width: theme.spacing(5), height: theme.spacing(5) }}
                  src={isDrawerOpen ? logoClosed.src : logoOpen.src}
                  alt={isDrawerOpen ? "Fechar menu" : "Abrir menu"}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Box className={styles.boxUser}>
            <ChangeTheme />
            <Typography variant="body1" sx={{ margin: "0 8px" }}>
              {user ? useFirstAndLastName(user.name) : "Desconhecido"}
            </Typography>
            <Tooltip title="Minha conta">
              <IconButton
                onClick={handleProfile}
                color="primary"
                sx={{ marginRight: theme.spacing(2) }}
              >
                <Avatar
                  sx={{
                    border: "1px solid #d32f2f",
                  }}
                  {...getAvatarProps()}
                />
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
