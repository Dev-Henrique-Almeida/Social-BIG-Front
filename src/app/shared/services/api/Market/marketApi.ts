import { IMarketCreateData } from "../../../@types";
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
    console.error("Erro ao criar o post:", error);
    throw error;
  }
};
