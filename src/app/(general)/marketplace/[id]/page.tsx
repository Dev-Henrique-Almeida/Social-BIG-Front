"use client";
import { IMarketData, IUserData } from "@/app/shared/@types";
import { useAuthContext } from "@/app/shared/contexts";
import useCurrency from "@/app/shared/hooks/RealCurrency/useCurrency";
import { getByMarket, getByUser } from "@/app/shared/services";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./marketDetails.module.scss";
import { Avatar } from "@mui/material";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import useMarketWithTimeElapsed from "@/app/shared/hooks/MarketWithTimeElapsed/useMarketWithTimeElapsed";

const MarketDetails = () => {
  const { user: userLogado, token } = useAuthContext();
  const pathname = usePathname();
  const [market, setMarket] = useState<IMarketData | null>(null);
  const [seller, setSeller] = useState<IUserData | null>(null);
  const [buyer, setBuyer] = useState<IUserData | null>(null);
  const { formatCurrency } = useCurrency();
  const themeStyles = useThemeStyles();

  const marketWithTimeElapsed = useMarketWithTimeElapsed(market);

  useEffect(() => {
    const fetchMarket = async () => {
      const marketId = pathname.split("/").pop() as string;
      if (userLogado && token) {
        try {
          const fetchedMarket = await getByMarket(marketId, token);
          const fetchedSeller = await getByUser(fetchedMarket.sellerId, token);
          setMarket(fetchedMarket);
          setSeller(fetchedSeller);
          console.log(fetchedMarket);

          if (fetchedMarket.buyerId) {
            const fetchedBuyer = await getByUser(fetchedMarket.buyerId, token);
            setBuyer(fetchedBuyer);
          }
        } catch (error) {
          console.error("Erro ao buscar o anúncio:", error);
        }
      }
    };
    fetchMarket();
  }, [userLogado, token, pathname]);

  if (!marketWithTimeElapsed || !seller) {
    return null;
  }

  const imageUrl = marketWithTimeElapsed.image || themeStyles.cardDetails.src;

  const handleBuyItem = () => {
    // Lógica para comprar o item
    console.log("Comprar Item");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes do Item</h1>
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={marketWithTimeElapsed.name}
          className={styles.image}
        />
      </div>
      <h1 className={styles.itemName}>{marketWithTimeElapsed.name}</h1>
      <p className={styles.description}>{marketWithTimeElapsed.description}</p>
      <p
        className={`${styles.status} ${
          marketWithTimeElapsed.vendido ? styles.sold : styles.available
        }`}
      >
        {marketWithTimeElapsed.vendido ? "Já vendido!" : "Ainda não vendido."}
      </p>
      <p className={styles.price}>
        {formatCurrency(marketWithTimeElapsed.price)}
      </p>
      {!marketWithTimeElapsed.vendido && (
        <button className={styles.buyButton} onClick={handleBuyItem}>
          Comprar Item
        </button>
      )}
      <div className={styles.infoRow}>
        <div className={styles.infoSection}>
          <p className={styles.infoTitle}>Vendedor</p>
          <div className={styles.userInfo}>
            <Avatar
              src={seller.image}
              alt={seller.name}
              className={styles.userImage}
            />
            <div className={styles.userDetails}>
              <p className={styles.userName}>{seller.name}</p>
              <div className={styles.userTime}>
                <p className={styles.date}>{marketWithTimeElapsed.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
        {buyer && (
          <div className={styles.infoSection}>
            <p className={styles.infoTitle}>Comprador</p>
            <div className={styles.userInfo}>
              <Avatar
                src={buyer.image}
                alt={buyer.name}
                className={styles.userImage}
              />
              <div className={styles.userDetails}>
                <p className={styles.userName}>{buyer.name}</p>
                <div className={styles.userTime}>
                  <p className={styles.date}>
                    {marketWithTimeElapsed.updatedAt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketDetails;
