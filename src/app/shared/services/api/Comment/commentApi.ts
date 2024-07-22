import { ICommentData } from "@/app/shared/@types";
import { api } from "../api";

export const createComment = async (comment: ICommentData, token: string) => {
  try {
    const response = await api.post("/comments", comment, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao criar o comentário, para o post: ${comment.postId}`,
      error
    );
    throw error;
  }
};

/* Atualizar e deletar */
