import React from "react";
import { Avatar, Divider } from "@mui/material";
import useAvatarProps from "../../hooks/AvatarProps/useAvatarProps";
import useProfileNavigation from "../../hooks/ProfileNavigation/useProfileNavigation";
import { ICommentsListProps, IComment } from "../../@types";
import styles from "./commentList.module.scss";

const CommentsList: React.FC<ICommentsListProps> = ({
  comments,
  visibleCommentsCount,
  postId,
  onShowMoreComments,
  onShowLessComments,
}) => {
  const { handlePickPerfil } = useProfileNavigation();

  const sortedComments = [...comments].sort((a: IComment, b: IComment) => {
    return (
      new Date(b.createdAt || "").getTime() -
      new Date(a.createdAt || "").getTime()
    );
  });

  return (
    <div className={styles.commentsSection}>
      {sortedComments.slice(0, visibleCommentsCount).map((comment) => (
        <div className={styles.comment} key={comment.id}>
          <Avatar
            sx={{
              width: "32px",
              height: "32px",
              border: "1px solid #d32f2f",
            }}
            {...useAvatarProps(comment.author)()}
            onClick={() => handlePickPerfil(comment.author.id)}
          />
          <div className={styles.commentContent}>
            <div className={styles.commentAuthor}>{comment.author.name}</div>
            <div className={styles.commentText}>{comment.content}</div>
          </div>
        </div>
      ))}
      {comments.length > visibleCommentsCount && (
        <div>
          <Divider sx={{ paddingTop: "20px", marginBottom: "20px" }} />
          <button
            className={styles.showMoreCommentsButton}
            onClick={() => onShowMoreComments(postId)}
          >
            Ver todos os comentários
          </button>
        </div>
      )}
      {visibleCommentsCount >= comments.length && (
        <div>
          <Divider sx={{ paddingTop: "20px", marginBottom: "20px" }} />
          <button
            className={styles.showMoreCommentsButton}
            onClick={() => onShowLessComments(postId)}
          >
            Ver menos comentários
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsList;
