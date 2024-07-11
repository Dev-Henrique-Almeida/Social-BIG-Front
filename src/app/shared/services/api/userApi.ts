import { IUserData } from "../../@types";
import { api, configHeaders } from "./api";

export const updateUser = async (user: IUserData) => {
  try {
    const response = await api.put(`/user`, user, configHeaders);
    return response.data;
  } catch (error) {
    throw error;
  }
};
