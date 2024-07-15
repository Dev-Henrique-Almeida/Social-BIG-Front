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

const ThemeContext = createContext({} as IThemeContexData);

export const useThemeContext = () => useContext(ThemeContext);

export const AppThemeProvider: React.FC<IChildrenProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<"dark" | "light">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (storedTheme) {
      setThemeName(storedTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeName((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }, []);

  const theme = useMemo(
    () => (themeName === "light" ? LightTheme : DarkTheme),
    [themeName]
  );

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
