"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IChildrenProps, IThemeContexData } from "../../@types";
import { DarkTheme, LightTheme } from "../../themes";
import { Box, ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { keyframes } from "@emotion/react";
import { localStorageUtils } from "../../utils";

const ThemeContext = createContext({} as IThemeContexData);

export const useThemeContext = () => useContext(ThemeContext);

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOutRight = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

export const AppThemeProvider: React.FC<IChildrenProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<"dark" | "light">("light");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (storedTheme) {
      setThemeName(storedTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setThemeName((prevTheme) => {
        const newTheme = prevTheme === "light" ? "dark" : "light";
        localStorageUtils.setItem("theme", newTheme);
        return newTheme;
      });
      setIsTransitioning(false);
    }, 500); // Tempo da animação
  }, []);

  const theme = useMemo(
    () => (themeName === "light" ? LightTheme : DarkTheme),
    [themeName]
  );

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
          sx={{
            animation: `${
              isTransitioning ? slideOutRight : slideInLeft
            } 0.5s ease`,
            transition: "background-color 0.5s ease, color 0.5s ease",
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
