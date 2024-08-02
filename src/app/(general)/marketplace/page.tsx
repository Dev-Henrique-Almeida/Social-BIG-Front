import CardMarket from "@/app/shared/components/CardMarket/cardMarket";
import React from "react";

export default function Marketplace() {
  const market = {
    id: "1",
    name: "Cachorro",
    description: "Cachorro fofinho",
    price: 1000,
    vendido: true,
  };

  return (
    <div>
      <CardMarket market={market} />
    </div>
  );
}
