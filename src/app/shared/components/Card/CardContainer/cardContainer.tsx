"use client";
import React, { useEffect, useState } from "react";
import { IMarketContainerProps, IMarketData } from "../../../@types";
import { getAllMarket } from "../../../services";
import CardMarket from "../CardMarket/cardMarket";

const CardContainer: React.FC<IMarketContainerProps> = ({ token }) => {
  const [market, setMarket] = useState<IMarketData[]>([]);

  const fetchMarket = async () => {
    try {
      const fetchedMarket = await getAllMarket(token);

      const sortedMarket = fetchedMarket.sort((a, b) => {
        const dateA = new Date(a.createdAt || "").getTime();
        const dateB = new Date(b.createdAt || "").getTime();
        return dateB - dateA;
      });

      setMarket(sortedMarket);
    } catch (error) {
      console.error("Erro ao buscar itens do marketplace:", error);
    }
  };

  useEffect(() => {
    fetchMarket();
  }, []);

  return <CardMarket market={market} refreshMarket={fetchMarket} />;
};

export default CardContainer;
