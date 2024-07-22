import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IPostDataWithTimeElapsed } from "@/app/shared/@types";

interface PostOptionsProps {
  post: IPostDataWithTimeElapsed;
  onEdit: () => void;
  onDelete: () => void;
}

const PostOptions: React.FC<PostOptionsProps> = ({
  /*  post, */
  onEdit,
  onDelete,
}) => {
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
        style={{ borderRadius: "50%", padding: "4px" }}
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

export default PostOptions;
