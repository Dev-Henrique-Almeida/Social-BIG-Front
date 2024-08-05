import React from "react";
import styles from "./cardMarketHeader.module.scss";

const CardMarketHeader: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.subtitle}>TODOS ITENS</h2>
        <h1 className={styles.title}>Marketplace</h1>
      </div>
      <button className={styles.addButton}>Adicionar Item</button>
    </div>
  );
};

export default CardMarketHeader;
