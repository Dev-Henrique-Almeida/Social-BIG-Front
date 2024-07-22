import { IUserData } from "../../../@types";
import { api, configHeaders } from "../api";

export const createUser = async (userData: IUserData) => {
  try {
    const response = await api.post(`/auth/register`, userData, configHeaders);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData: IUserData) => {
  try {
    const response = await api.post(`/auth/login`, userData, configHeaders);
    return response.data;
  } catch (error) {
    throw error;
  }
};
