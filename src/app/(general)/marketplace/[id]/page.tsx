"use client";
import { IMarketData, IUserData } from "@/app/shared/@types";
import { useAuthContext } from "@/app/shared/contexts";
import { getByMarket, getByUser } from "@/app/shared/services";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const MarketDetails = () => {
  const { user: userLogado, token } = useAuthContext();
  const pathname = usePathname();
  const [market, setMarket] = useState<IMarketData | null>(null);
  const [seller, setSeller] = useState<IUserData | null>(null);
  const [buyer, setBuyer] = useState<IUserData | null>(null); // Adicione o estado do buyer

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
            // Condicionalmente buscar o comprador
            const fetchedBuyer = await getByUser(fetchedMarket.buyerId, token);
            setBuyer(fetchedBuyer);
          }
        } catch (error) {
          console.error("Erro ao buscar mercado:", error);
        }
      }
    };
    fetchMarket();
  }, [userLogado, token, pathname]);

  if (!market || !seller) {
    return null;
  }

  return (
    <div>
      <h1>Detalhes do Item</h1>
      <img src={market.image} alt={market.name} />
      <h1>{market.name}</h1>
      <p>{market.description}</p>
      <p>{market.price}</p>
      <p>Vendedor: {seller.name}</p>
      <p>Anunciado: {market.createdAt}</p>
      {buyer && (
        <div>
          <p>Comprador: {buyer.name}</p>
          <p>Comprado: {market.updatedAt}</p>
        </div>
      )}
    </div>
  );
};

export default MarketDetails;
