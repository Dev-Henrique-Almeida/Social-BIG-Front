"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { IChildrenProps, IThemeContexData } from "../../@types";
import { DarkTheme, LightTheme } from "../../themes";
import { Box, ThemeProvider } from "@mui/material";

const ThemeContext = createContext({} as IThemeContexData);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IChildrenProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<"dark" | "light">("light");

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === "light" ? "dark" : "light"
    );
  }, []);

  const theme = useMemo(() => {
    return themeName === "light" ? LightTheme : DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width={"100vw"}
          height={"100vh"}
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
