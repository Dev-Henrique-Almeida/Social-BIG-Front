import React from "react";
import { Button } from "@mui/material";
import styles from "./showMoreButton.module.scss";

interface ShowMoreButtonProps {
  isShowMore: boolean;
  onClick: () => void;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  isShowMore,
  onClick,
}) => (
  <Button
    color={isShowMore ? "primary" : "secondary"}
    variant="contained"
    onClick={onClick}
    className={styles.showMoreButton}
  >
    {isShowMore ? "Ver Mais" : "Ver Menos"}
  </Button>
);

export default ShowMoreButton;
