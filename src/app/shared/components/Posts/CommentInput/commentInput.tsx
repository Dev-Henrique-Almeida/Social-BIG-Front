import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { useAuthContext } from "@/app/shared/contexts";
import styles from "./commentInput.module.scss";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import { ICommentData, ICommentInputProps } from "@/app/shared/@types";
import useAvatarProps from "@/app/shared/hooks/AvatarProps/useAvatarProps";
import { createComment } from "@/app/shared/services/api/Comment/commentApi";

const CommentInput: React.FC<ICommentInputProps> = ({
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

    const newComment: ICommentData = {
      content: commentText,
      authorId: user?.id || "",
      postId,
      createdAt: new Date().toISOString(),
    };

    try {
      const createdComment = await createComment(newComment, token || "");
      onCommentAdded({ ...createdComment, author: user! });
      setCommentText("");
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCommentSubmit();
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
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleCommentSubmit} className={styles.button}>
        Comentar
      </button>
    </div>
  );
};

export default CommentInput;
