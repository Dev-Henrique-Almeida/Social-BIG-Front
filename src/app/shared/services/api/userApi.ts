import { IUserData } from "../../@types";
import { api, configHeaders } from "./api";

export const updateUser = async (user: IUserData, token: string) => {
  try {
    const headersWithToken = {
      ...configHeaders,
      headers: {
        ...configHeaders.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.put(`/user`, user, headersWithToken);
    return response.data;
  } catch (error) {
    throw error;
  }
};
