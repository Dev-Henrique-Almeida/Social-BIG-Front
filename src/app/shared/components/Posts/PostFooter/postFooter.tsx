import React from "react";
import styles from "./postFooter.module.scss";
import { IPostDataWithTimeElapsed } from "@/app/shared/@types";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";

interface PostFooterProps {
  post: IPostDataWithTimeElapsed;
  onLike: (postId: string) => void;
  isLiked: boolean;
}

const PostFooter: React.FC<PostFooterProps> = ({ post, onLike, isLiked }) => {
  const themeStyles = useThemeStyles();
  return (
    <div className={styles.bottomFields}>
      <div
        className={`${styles.likeButton} ${isLiked ? styles.liked : ""}`}
        onClick={() => onLike(post.id)}
      >
        <div className={styles.vector}></div>
        <div className={`${styles.curtiu} ${isLiked ? styles.likedText : ""}`}>
          {isLiked ? "Curtiu" : "Curtir"}
        </div>
        <div
          className={`${styles.frame10} ${isLiked ? styles.likedCounter : ""}`}
          style={{
            backgroundColor: !isLiked
              ? themeStyles.backgroundDefault
              : undefined,
          }}
        >
          <div className={styles.likesCount}>{post.likes}</div>
        </div>
      </div>
      <div className={styles.commentsButton}>
        <div className={styles.vector}></div>
        <div className={styles.comentarios}>Comentários</div>
        <div
          className={styles.frame10}
          style={{
            backgroundColor: themeStyles.backgroundDefault,
          }}
        >
          <div className={styles.commentsCount}>{post.comments.length}</div>
        </div>
      </div>
    </div>
  );
};

export default PostFooter;
