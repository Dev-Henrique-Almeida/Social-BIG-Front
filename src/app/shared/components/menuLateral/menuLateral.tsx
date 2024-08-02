"use client";
import {
  Box,
  Card,
  Drawer,
  List,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IChildrenProps } from "../../@types";
import { useDrawerContext, useThemeContext } from "../../contexts";
import { useResponsiveContent } from "../../hooks/Responsive/useResponsiveContent";
import { usePathname, useRouter } from "next/navigation";
import { NavBar } from "../NavBarCustom/navBar";
import styles from "./menuLateral.module.scss";
import Link from "next/link";
import logoPositivo from "../../../assets/logo.png";
import logo from "../../../assets/logo-dark.png";
import { localStorageUtils } from "../../utils";

export const MenuLateral: React.FC<IChildrenProps> = ({ children }) => {
  const theme = useTheme();
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const marginLeft = useResponsiveContent();
  const router = useRouter();
  const pathname = usePathname();
  const { themeName } = useThemeContext();

  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = mdDown ? "100%" : theme.spacing(44);

  const [selectedItem, setSelectedItem] = useState("Página Inicial");

  const menuItems = [
    { title: "Página Inicial", path: "/home" },
    { title: "Meu Perfil", path: "/perfil" },
    { title: "Marketplace", path: "/marketplace" },
    { title: "Sair", path: "/" },
  ];

  const handleItemClick = (_path: string, item: string) => {
    setSelectedItem(item);
    if (mdDown) {
      toggleDrawerOpen();
    }
    if (item === "Sair") {
      const currentTheme = localStorageUtils.getItem("theme");
      localStorage.clear();
      if (currentTheme) {
        localStorageUtils.setItem("theme", currentTheme);
      }
      router.push("/");
    }
  };

  useEffect(() => {
    const currentPath = pathname;
    const currentItem = menuItems.find((item) => item.path === currentPath);
    if (currentItem) {
      setSelectedItem(currentItem.title);
    } else if (currentPath.startsWith("/perfil")) {
      setSelectedItem("Meu Perfil");
    }
  }, [pathname, menuItems]);

  const logoUrl = themeName === "dark" ? logo : logoPositivo;

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant="persistent"
        onClose={toggleDrawerOpen}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        <Box className={styles.boxMaster}>
          <Box className={styles.boxLogo}>
            <img src={logoUrl.src} alt="Logo" width={theme.spacing(30)} />
          </Box>

          <Box flex={1}>
            <List component="nav">
              <Card className={styles.menuItem}>
                {menuItems.map((link) => (
                  <Link
                    key={link.title}
                    className={`${styles.linkFull} ${
                      selectedItem === link.title ? styles.activeLink : ""
                    }`}
                    href={link.path}
                    onClick={() => handleItemClick(link.path, link.title)}
                  >
                    <Typography>{link.title}</Typography>
                  </Link>
                ))}
              </Card>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={marginLeft}>
        <NavBar>{children}</NavBar>
      </Box>
    </>
  );
};
