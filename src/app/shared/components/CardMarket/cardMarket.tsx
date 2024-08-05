import React from "react";
import { IMarketData } from "../../@types";
import styles from "./cardMarket.module.scss";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";

interface IMarketContent {
  market: IMarketData[];
}

const CardMarket: React.FC<IMarketContent> = ({ market }) => {
  const themeStyles = useThemeStyles();

  const truncateDescription = (description: string) => {
    if (description.length > 120) {
      return description.substring(0, 120) + "...";
    }
    return description;
  };

  return (
    <div className={styles.cardContainer}>
      {market.map((card) => (
        <div
          key={card.id}
          className={styles.card}
          style={{
            background: themeStyles.backgroundPaper,
            color: themeStyles.textColor,
          }}
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
          <p className={styles.cardPrice}>R$ {card.price}</p>
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
  );
};

export default CardMarket;
