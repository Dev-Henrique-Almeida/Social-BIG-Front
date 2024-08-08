"use client";
import { useEffect, useState } from "react";
import { IFormEditProps, IMarketData } from "../../@types";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { getAllMarket } from "../../services";
import { Avatar } from "@mui/material";
import styles from "./cardDestaque.module.scss";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";
import useFirstAndLastName from "../../hooks/FirstAndLastName/useFirstAndLastName";
import useMarketNavigation from "../../hooks/MarketNavigation/useMarketNavigation";
import useCurrency from "../../hooks/RealCurrency/useCurrency";

const CardDestaque: React.FC<IFormEditProps> = ({ token }) => {
  const [markets, setMarkets] = useState<IMarketData[]>([]);
  const themeStyles = useThemeStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { handlePickMarket } = useMarketNavigation();
  const { formatCurrency } = useCurrency();

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const markets = await getAllMarket(token);
        setMarkets(markets);
      } catch (error) {
        console.error("Erro ao buscar anuncios do marketplace:", error);
      }
    };

    fetchMarkets();
  }, [token]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (markets.length === 0) {
    return null;
  }

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: themeStyles.backgroundPaper,
        border: themeStyles.borderColor,
      }}
    >
      <div className={styles.header} onClick={handleToggle}>
        <div className={styles.title}>Itens em destaque</div>
        <div className={styles.icon}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      <div className={`${styles.friendList} ${isOpen ? styles.open : ""}`}>
        {markets.map((market) => (
          <div className={styles.friendItem} key={market.id}>
            <Avatar
              onClick={() => handlePickMarket(market.id!)}
              className={styles.avatarStyle}
              src={market.image || themeStyles.cardImage.src}
              sx={{
                cursor: "pointer",
              }}
            />
            <div className={styles.friendName}>
              <div className={styles.name}>
                {useFirstAndLastName(market.name)}
              </div>
              <div className={styles.price}>{formatCurrency(market.price)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDestaque;
