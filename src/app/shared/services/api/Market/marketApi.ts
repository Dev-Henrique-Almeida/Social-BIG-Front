import { IMarketCreateData, IMarketData } from "../../../@types";
import { api } from "../api";

export const createMarket = async (
  market: IMarketCreateData,
  token: string
) => {
  try {
    const response = await api.post("/market", market, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar um anunio no marketplace:", error);
    throw error;
  }
};

export const getAllMarket = async (token: string): Promise<IMarketData[]> => {
  try {
    const response = await api.get(`/market`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro na busca dos itens do marketplace:", error);
    throw error;
  }
};
