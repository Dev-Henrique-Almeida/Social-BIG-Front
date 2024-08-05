"use client";
import React, { useEffect, useState } from "react";
import { IMarketContainerProps, IMarketData } from "../../@types";
import { getAllMarket } from "../../services";
import CardMarket from "../CardMarket/cardMarket";

const CardContainer: React.FC<IMarketContainerProps> = ({ token }) => {
  const [market, setMarket] = useState<IMarketData[]>([]);
  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const fetchedMarket = await getAllMarket(token);
        setMarket(fetchedMarket);
      } catch (error) {
        console.error("Erro ao buscar itens do marketplace:", error);
      }
    };
    fetchMarket();
  }, []);

  return <CardMarket market={market} />;
};

export default CardContainer;
