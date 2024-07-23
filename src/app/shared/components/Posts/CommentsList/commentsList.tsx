import React, { useState, useEffect } from "react";
import { Avatar, Divider, IconButton } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import styles from "./commentList.module.scss";
import useCommentsWithTimeElapsed from "@/app/shared/hooks/TimeElapsedComments/useCommentsWithTimeElapsed";
import useProfileNavigation from "@/app/shared/hooks/ProfileNavigation/useProfileNavigation";
import { IComment, ICommentsListProps } from "@/app/shared/@types";
import useAvatarProps from "@/app/shared/hooks/AvatarProps/useAvatarProps";
import { useAuthContext } from "@/app/shared/contexts";
import { likeComment } from "@/app/shared/services/api/Comment/commentApi";
import { cookieUtils } from "@/app/shared/utils/CookieStorage/cookiesStorage";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";

const CommentsList: React.FC<ICommentsListProps> = ({
  comments,
  visibleCommentsCount,
  postId,
  onShowMoreComments,
  onShowLessComments,
}) => {
  const { handlePickPerfil } = useProfileNavigation();
  const commentsWithTimeElapsed = useCommentsWithTimeElapsed(comments);
  const { user, token } = useAuthContext();
  const themeStyles = useThemeStyles();
  const [localComments, setLocalComments] = useState<IComment[]>([]);
  const [likedComments, setLikedComments] = useState<string[]>([]);

  useEffect(() => {
    setLocalComments(commentsWithTimeElapsed);
  }, [commentsWithTimeElapsed]);

  useEffect(() => {
    if (user?.id) {
      const savedLikes = cookieUtils.getLikedPostsByUser(user.id);
      setLikedComments(savedLikes);
    }
  }, [user?.id]);

  const sortedComments = [...localComments].sort((a: IComment, b: IComment) => {
    return (
      new Date(b.createdAt || "").getTime() -
      new Date(a.createdAt || "").getTime()
    );
  });

  const handleLikeComment = async (commentId: string) => {
    if (!user || !token) return;

    try {
      await likeComment(commentId, user.id!, token);
      const updatedLikedComments = likedComments.includes(commentId)
        ? likedComments.filter((id) => id !== commentId)
        : [...likedComments, commentId];
      setLikedComments(updatedLikedComments);
      cookieUtils.setLikedPostsByUser(user.id!, updatedLikedComments);
      setLocalComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                likeCount: likedComments.includes(commentId)
                  ? (comment.likeCount || 0) - 1
                  : (comment.likeCount || 0) + 1,
              }
            : comment
        )
      );
    } catch (error) {
      console.error("Erro ao curtir o comentário:", error);
    }
  };

  return (
    <div className={styles.commentsSection}>
      {sortedComments.length > 0 && <p>Todos os comentários</p>}
      {sortedComments.slice(0, visibleCommentsCount).map((comment) => (
        <div className={styles.comment} key={comment.id}>
          <Avatar
            className={styles.avatarStyle}
            {...useAvatarProps(comment.author)()}
            onClick={() => handlePickPerfil(comment.author.id)}
          />
          <div className={styles.commentContent}>
            <div className={styles.commentAuthor}>
              {comment.author?.name ? (
                <>
                  {comment.author.name} •{" "}
                  <span className={styles.commentTime}>
                    {comment.timeElapsed}
                  </span>
                </>
              ) : (
                <span className={styles.commentTime}>
                  {comment.timeElapsed}
                </span>
              )}
            </div>
            <div className={styles.commentText}>{comment.content}</div>
            <div className={styles.commentActions}>
              <IconButton
                className={`${styles.likeButton} ${
                  likedComments.includes(comment.id) ? styles.liked : ""
                }`}
                onClick={() => handleLikeComment(comment.id)}
              >
                <ThumbUp fontSize="small" />
              </IconButton>
              <div
                className={`${styles.likeCountFrame} ${
                  likedComments.includes(comment.id)
                    ? styles.liked
                    : styles.unliked
                }`}
                style={{
                  backgroundColor: likedComments.includes(comment.id)
                    ? undefined
                    : themeStyles.backgroundDefault,
                  color: themeStyles.textColor,
                }}
              >
                <span className={styles.likeCount}>
                  {comment.likeCount || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {comments.length === 0 && (
        <div>
          <Divider sx={{ paddingTop: "20px", marginBottom: "20px" }} />
          <button
            className={styles.showMoreCommentsButton}
            style={{ cursor: "default" }}
          >
            Não há comentários
          </button>
        </div>
      )}
      {comments.length > visibleCommentsCount && (
        <div>
          <Divider sx={{ paddingTop: "20px", marginBottom: "20px" }} />
          <button
            className={styles.showMoreCommentsButton}
            onClick={() => onShowMoreComments(postId)}
          >
            Ver mais comentários
          </button>
        </div>
      )}
      {visibleCommentsCount > 2 &&
        visibleCommentsCount >= comments.length &&
        comments.length > 0 && (
          <div>
            <Divider className={styles.divider} />
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
