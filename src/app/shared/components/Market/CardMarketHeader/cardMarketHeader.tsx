import React from "react";
import styles from "./cardMarketHeader.module.scss";

interface CardMarketHeaderProps {
  onAddButtonClick: () => void;
}

const CardMarketHeader: React.FC<CardMarketHeaderProps> = ({
  onAddButtonClick,
}) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.subtitle}>TODOS ITENS</h2>
        <h1 className={styles.title}>Marketplace</h1>
      </div>
      <button className={styles.addButton} onClick={onAddButtonClick}>
        Adicionar Item
      </button>
    </div>
  );
};

export default CardMarketHeader;
