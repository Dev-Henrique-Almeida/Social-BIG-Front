import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { useAuthContext } from "@/app/shared/contexts";
import { createComment } from "../../services/api/commentApi";
import useAvatarProps from "../../hooks/AvatarProps/useAvatarProps";
import styles from "./commentInput.module.scss";
import { ICommentData } from "../../@types";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";

interface CommentInputProps {
  postId: string;
  onCommentAdded: (comment: ICommentData) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  postId,
  onCommentAdded,
}) => {
  const { user, token } = useAuthContext();
  const [commentText, setCommentText] = useState("");
  const themeStyles = useThemeStyles();

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim() === "") return;

    const newComment = {
      content: commentText,
      authorId: user?.id || "",
      postId,
    };

    try {
      const createdComment = await createComment(newComment, token || "");
      onCommentAdded(createdComment);
      setCommentText("");
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
    }
  };

  return (
    <div
      className={styles.commentInput}
      style={{
        backgroundColor: themeStyles.backgroundDefault,
      }}
    >
      <Avatar {...useAvatarProps()()} className={styles.avatar} />
      <input
        className={styles.textField}
        style={{
          color: themeStyles.textColor,
        }}
        placeholder="Tem algo a dizer?"
        value={commentText}
        onChange={handleCommentChange}
      />
      <button onClick={handleCommentSubmit} className={styles.button}>
        Comentar
      </button>
    </div>
  );
};

export default CommentInput;
