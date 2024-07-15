import React from "react";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../../contexts";

export default function ChangeTheme() {
  const theme = useTheme();
  const { toggleTheme } = useThemeContext();

  return (
    <Tooltip title="Alterar tema">
      <IconButton onClick={toggleTheme} color="primary">
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  );
}
