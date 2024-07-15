import { IUserData } from "../../@types";
import { api, configHeaders } from "./api";

export const updateUser = async (
  user: IUserData,
  id: string,
  token: string
) => {
  try {
    const headersWithToken = {
      ...configHeaders,
      headers: {
        ...configHeaders.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.put(`/users/${id}`, user, headersWithToken);
    return response.data;
  } catch (error) {
    console.error("Erro na atualização do usuário:", error);
    throw error;
  }
};

export const getAllUsers = async (token: string) => {
  try {
    const headersWithToken = {
      ...configHeaders.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await api.get("/users", {
      headers: headersWithToken,
    });
    return response.data;
  } catch (error) {
    console.error("Erro na busca de todos os usuários:", error);
    throw error;
  }
};
