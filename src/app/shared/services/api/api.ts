import axios from "axios";
import { useAuthContext } from "../../contexts/Auth/AuthContext";

const { token } = useAuthContext();

const kBaseUrl = "http://localhost:3001";
export const api = axios.create({
  baseURL: kBaseUrl,
});

const configHeaders = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export { kBaseUrl, configHeaders };
