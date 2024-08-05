import { IMarketCreateData, IMarketData } from "../../../@types";
import { api, configHeaders } from "../api";

export const createMarket = async (data: IMarketCreateData, token: string) => {
  try {
    const response = await api.post("/market", data, {
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

export const getByMarket = async (id: string, token: string) => {
  try {
    const headersWithToken = {
      ...configHeaders,
      headers: {
        ...configHeaders.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.get(`/market/${id}`, headersWithToken);
    return response.data;
  } catch (error) {
    console.error("Erro na busca do anuncio:", error);
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
