"use client";
import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { IMarketData } from "@/app/shared/@types";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import FormCreateCard from "../FormCreateCard/formCreateCard";
import CardMarketHeader from "../CardMarketHeader/cardMarketHeader";
import styles from "./cardMarket.module.scss";
import useCurrency from "@/app/shared/hooks/RealCurrency/useCurrency";

interface IMarketContent {
  market: IMarketData[];
  refreshMarket: () => void;
}

const CardMarket: React.FC<IMarketContent> = ({ market, refreshMarket }) => {
  const themeStyles = useThemeStyles();
  const { formatCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleAddButtonClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCardClick = (id: string) => {
    router.push(`/marketplace/${id}`);
  };

  const truncateDescription = (description: string) => {
    if (description.length > 120) {
      return description.substring(0, 120) + "...";
    }
    return description;
  };

  return (
    <div>
      <CardMarketHeader onAddButtonClick={handleAddButtonClick} />
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box className={styles.modalBox}>
          <FormCreateCard onClose={handleClose} refreshMarket={refreshMarket} />
        </Box>
      </Modal>
      <div className={styles.cardContainer}>
        {market.map((card) => (
          <div
            key={card.id}
            className={styles.card}
            style={{
              background: themeStyles.backgroundPaper,
              color: themeStyles.textColor,
            }}
            onClick={() => handleCardClick(card.id)}
          >
            <img
              src={card.image || themeStyles.cardImage.src}
              alt={card.name}
              className={styles.cardImage}
            />
            <h1 className={styles.cardTitle}>{card.name}</h1>
            <p className={styles.cardDescription}>
              {truncateDescription(card.description)}
            </p>
            <p className={styles.cardPrice}>{formatCurrency(card.price)}</p>
            <p
              className={`${styles.cardStatus} ${
                card.vendido ? styles.sold : styles.available
              }`}
            >
              {card.vendido ? "Já vendido!" : "Ainda não vendido."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardMarket;
