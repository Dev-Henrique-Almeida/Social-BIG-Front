import { useState, useEffect } from "react";
import { IMarketData } from "@/app/shared/@types";

const useMarketWithTimeElapsed = (
  market: IMarketData | null
): IMarketData | null => {
  const [marketWithTimeElapsed, setMarketWithTimeElapsed] =
    useState<IMarketData | null>(null);

  useEffect(() => {
    if (!market) return;

    const calculateTimeElapsed = (date: Date): string => {
      const now = new Date();
      const elapsedTime = now.getTime() - date.getTime();
      const seconds = Math.floor(elapsedTime / 1000);

      if (seconds < 60) {
        return `${seconds} segundos atrás`;
      } else {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
          return `${minutes} ${minutes === 1 ? "minuto" : "minutos"} atrás`;
        } else {
          const hours = Math.floor(minutes / 60);
          const remainingMinutes = minutes % 60;
          if (hours < 24) {
            if (remainingMinutes === 0) {
              return `${hours} ${hours === 1 ? "hora" : "horas"} atrás`;
            } else {
              return `${hours} ${
                hours === 1 ? "hora" : "horas"
              } e ${remainingMinutes} ${
                remainingMinutes === 1 ? "minuto" : "minutos"
              } atrás`;
            }
          } else {
            const days = Math.floor(hours / 24);
            const remainingHours = hours % 24;
            if (remainingHours === 0) {
              return `${days} ${days === 1 ? "dia" : "dias"} atrás`;
            } else {
              return `${days} ${
                days === 1 ? "dia" : "dias"
              } e ${remainingHours} ${
                remainingHours === 1 ? "hora" : "horas"
              } atrás`;
            }
          }
        }
      }
    };

    const createdAtDate = market.createdAt
      ? new Date(market.createdAt)
      : new Date();
    const updatedAtDate = market.updatedAt
      ? new Date(market.updatedAt)
      : new Date();

    setMarketWithTimeElapsed({
      ...market,
      createdAt: calculateTimeElapsed(createdAtDate),
      updatedAt: calculateTimeElapsed(updatedAtDate),
    });
  }, [market]);

  return marketWithTimeElapsed;
};

export default useMarketWithTimeElapsed;
