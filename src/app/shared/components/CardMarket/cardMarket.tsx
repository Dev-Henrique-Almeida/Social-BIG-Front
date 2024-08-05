import React from "react";
import { IMarketData } from "../../@types";

interface IMarketContent {
  market: IMarketData[];
}

const CardMarket: React.FC<IMarketContent> = ({ market }) => {
  return (
    <div>
      {market.map((card) => (
        <div key={card.id}>
          <img src={card.image || "TESTE IMAGEM"} alt={card.name} />
          <h1>{card.name}</h1>
          <p>{card.description}</p>
          <p>{card.price}</p>
          <p>{card.vendido ? "TRUE" : "FALSE"} </p>
        </div>
      ))}
    </div>
  );
};

export default CardMarket;
