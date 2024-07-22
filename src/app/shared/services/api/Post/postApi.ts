import { IPostCreateData, IPostData } from "../../../@types";
import { api, configHeaders } from "../api";

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

export const updatePost = async (
  post: IPostCreateData,
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

    const response = await api.put(`/posts/${id}`, post, headersWithToken);
    return response.data;
  } catch (error) {
    console.error("Erro na atualização do post:", error);
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
  userId: string
): Promise<IPostData> => {
  try {
    const response = await api.patch(
      `/posts/like/${id}`,
      { userId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Erro ao dar like no post:`, error);
    throw error;
  }
};
