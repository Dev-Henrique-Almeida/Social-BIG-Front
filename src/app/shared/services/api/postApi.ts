import { IPostData } from "../../@types";
import { api, configHeaders } from "./api";

export const createPost = async (post: IPostData, token: string) => {
  try {
    const headersWithToken = {
      ...configHeaders,
      headers: {
        ...configHeaders.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.post(`/posts`, post, headersWithToken);
    return response.data;
  } catch (error) {
    console.error("Erro na criação do post:", error);
    throw error;
  }
};
