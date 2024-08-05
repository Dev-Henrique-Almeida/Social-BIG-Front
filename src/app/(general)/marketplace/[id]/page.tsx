"use client";
import { IMarketData } from "@/app/shared/@types";
import { useAuthContext } from "@/app/shared/contexts";
import { getByMarket } from "@/app/shared/services";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const MarketDetails = () => {
  const { user: userLogado, token } = useAuthContext();
  const pathname = usePathname();
  const [market, setMarket] = useState<IMarketData | null>(null);

  useEffect(() => {
    const fetchMarket = async () => {
      const marketId = pathname.split("/").pop() as string;
      if (userLogado && token) {
        try {
          const fetchedMarket = await getByMarket(marketId, token);
          setMarket(fetchedMarket);
          console.log(fetchedMarket);
        } catch (error) {
          console.error("Erro ao buscar mercado:", error);
        }
      }
    };
    fetchMarket();
  }, [userLogado, token, pathname]);

  if (!market) {
    return null;
  }

  return (
    <div>
      <h1>{market.name}</h1>
      <p>{market.price}</p>
      <p>{market.description}</p>
      <img src={market.image} />
    </div>
  );
};

export default MarketDetails;
