import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IMarketOptionsProps } from "@/app/shared/@types";
import styles from "./marketOptions.module.scss";

const MarketOptions: React.FC<IMarketOptionsProps> = ({ onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        className={styles.iconStyle}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            left: "auto",
            right: 0,
            width: "120px",
          },
        }}
      >
        <MenuItem onClick={onEdit}>Editar</MenuItem>
        <MenuItem onClick={onDelete}>Excluir</MenuItem>
        <MenuItem onClick={handleMenuClose}>Cancelar</MenuItem>
      </Menu>
    </div>
  );
};

export default MarketOptions;
