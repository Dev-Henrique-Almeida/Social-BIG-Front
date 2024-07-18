import { IPostCreateData, IPostData } from "../../@types";
import { api } from "./api";

export const createPost = async (post: IPostCreateData, token: string) => {
  try {
    const response = await api.post("/posts", post, {
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

export const getAllPosts = async (token: string): Promise<IPostData[]> => {
  try {
    const response = await api.get(`/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro na busca dos post:", error);
    throw error;
  }
};

export const getAllPostsByUser = async (
  userId: string,
  token: string
): Promise<IPostData[]> => {
  try {
    const response = await api.get(`/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const filteredPosts = response.data.filter(
      (post: { authorId: string }) => post.authorId === userId
    );
    return filteredPosts;
  } catch (error) {
    console.error("Erro na busca dos posts:", error);
    throw error;
  }
};

export const likePost = async (
  id: string,
  token: string,
  action: "like" | "unlike"
): Promise<IPostData> => {
  try {
    const response = await api.patch(`/posts/${action}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      `Erro ao ${action === "like" ? "dar like" : "tirar like"} no post:`,
      error
    );
    throw error;
  }
};

export const deletePost = async (
  id: string,
  token: string
): Promise<string> => {
  try {
    const response = await api.delete(`/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.message;
  } catch (error) {
    console.error("Erro ao deletar post dos posts:", error);
    throw error;
  }
};
