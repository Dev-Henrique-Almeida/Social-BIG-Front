import React, { useState, useEffect } from "react";
import { Avatar, Divider } from "@mui/material";
import styles from "./commentList.module.scss";
import useCommentsWithTimeElapsed from "@/app/shared/hooks/TimeElapsedComments/useCommentsWithTimeElapsed";
import useProfileNavigation from "@/app/shared/hooks/ProfileNavigation/useProfileNavigation";
import { IComment, ICommentsListProps } from "@/app/shared/@types";
import useAvatarProps from "@/app/shared/hooks/AvatarProps/useAvatarProps";
import { v4 as uuidv4 } from "uuid";
import useFirstAndLastName from "@/app/shared/hooks/FirstAndLastName/useFirstAndLastName";

const CommentsList: React.FC<ICommentsListProps> = ({
  comments,
  visibleCommentsCount,
  postId,
  onShowMoreComments,
  onShowLessComments,
}) => {
  const { handlePickPerfil } = useProfileNavigation();
  const commentsWithTimeElapsed = useCommentsWithTimeElapsed(comments);
  const [localComments, setLocalComments] = useState<IComment[]>([]);

  useEffect(() => {
    setLocalComments(
      commentsWithTimeElapsed.map((comment) => ({
        ...comment,
        id: comment.id || uuidv4(),
      }))
    );
  }, [commentsWithTimeElapsed]);

  const sortedComments = [...localComments].sort((a: IComment, b: IComment) => {
    return (
      new Date(b.createdAt || "").getTime() -
      new Date(a.createdAt || "").getTime()
    );
  });

  return (
    <div className={styles.commentsSection}>
      {sortedComments.length > 0 && <p>Todos os comentários</p>}
      {sortedComments.slice(0, visibleCommentsCount).map((comment) => {
        const fullName = comment.author?.name || "";
        const displayName = useFirstAndLastName(fullName);

        return (
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
                    {displayName} •{" "}
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
            </div>
          </div>
        );
      })}
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
