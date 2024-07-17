import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { IPostsProps } from "../../@types";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";
import usePostsWithTimeElapsed from "../../hooks/TimeElapsed/useTimeElapsed";
import styles from "./posts.module.scss";
import useAvatarProps from "../../hooks/AvatarProps/useAvatarProps";

const Posts: React.FC<IPostsProps> = ({ posts, isButton = false }) => {
  const themeStyles = useThemeStyles();
  const postsWithTimeElapsed = usePostsWithTimeElapsed(posts);
  const [visiblePostsCount, setVisiblePostsCount] = useState(posts.length);

  useEffect(() => {
    if (isButton) {
      setVisiblePostsCount(2);
    } else {
      setVisiblePostsCount(posts.length);
    }
  }, [isButton, posts.length]);

  const handleShowMorePosts = () => {
    setVisiblePostsCount((prevCount) => prevCount + 2);
  };

  const handleShowLessPosts = () => {
    setVisiblePostsCount(2);
  };

  return (
    <div className={styles.posts}>
      {postsWithTimeElapsed.slice(0, visiblePostsCount).map((post) => (
        <div
          className={styles.post}
          style={{
            backgroundColor: themeStyles.backgroundPaper,
            border: themeStyles.borderColor,
          }}
          key={post.id}
        >
          <div className={styles.frame1}>
            <div className={styles.userIcons}>
              <Avatar {...useAvatarProps(post.author)()} />
            </div>
            <div className={styles.postHeader}>
              <div className={styles.postAuthor}>{post.author.name}</div>
              <div className={styles.postTimeLocation}>
                {post.timeElapsed}
                {post.location && (
                  <>
                    {" "}
                    em{" "}
                    <span className={styles.postLocation}>{post.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.oQueVoceEstaPensando}>{post.text}</div>
          {post.image && (
            <div
              className={styles.unsplash}
              style={{ backgroundImage: `url(${post.image})` }}
            ></div>
          )}
          <div className={styles.bottomFields}>
            <div className={styles.likeButton}>
              <div className={styles.vector}></div>
              <div className={styles.curtiu}>Curtiu</div>
              <div className={styles.frame10}>
                <div className={styles.likesCount}>{post.likes}</div>
              </div>
            </div>
            <div className={styles.commentsButton}>
              <div className={styles.vector}></div>
              <div className={styles.comentarios}>Comentários</div>
              <div className={styles.frame10}>
                <div className={styles.commentsCount}>
                  {post.comments.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isButton && visiblePostsCount < postsWithTimeElapsed.length && (
        <Button
          color="primary"
          variant="contained"
          onClick={handleShowMorePosts}
          className={styles.showMoreButton}
        >
          Ver Mais
        </Button>
      )}
      {isButton &&
        visiblePostsCount >= postsWithTimeElapsed.length &&
        visiblePostsCount > 2 && (
          <Button
            color="primary"
            variant="contained"
            onClick={handleShowLessPosts}
            className={styles.showMoreButton}
          >
            Ver Menos
          </Button>
        )}
    </div>
  );
};

export default Posts;
