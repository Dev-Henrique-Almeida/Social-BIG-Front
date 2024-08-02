import React from "react";
import { IMarketData } from "../../@types";

interface IMarketContent {
  market: IMarketData;
}

const CardMarket: React.FC<IMarketContent> = ({ market }) => {
  return (
    <div>
      <p>{market.image || "TESTE IMAGEM"}</p>
      <h1>{market.name}</h1>
      <p>{market.description}</p>
      <p>{market.price}</p>
      <p>{market.vendido ? "TRUE" : "FALSE"} </p>
    </div>
  );
};

export default CardMarket;
