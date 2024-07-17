import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { IPostsProps } from "../../@types";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";
import usePostsWithTimeElapsed from "../../hooks/TimeElapsed/useTimeElapsed";
import styles from "./posts.module.scss";
import useAvatarProps from "../../hooks/AvatarProps/useAvatarProps";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "../../contexts";

const Posts: React.FC<IPostsProps> = ({ posts, isButton = false }) => {
  const themeStyles = useThemeStyles();
  const router = useRouter();
  const { user } = useAuthContext();
  const pathname = usePathname();
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

  const isProfilePage = pathname !== "/home";

  const handlePickPerfil = (id: string) => {
    if (user!.id === id) {
      router.push(`/perfil/`);
    } else {
      if (!isProfilePage) {
        router.push(`/perfil/${id}`);
      }
    }
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
              <Avatar
                onClick={() => handlePickPerfil(post.author.id)}
                {...useAvatarProps(post.author)()}
                sx={{
                  border: "1px solid #E9B425",
                  cursor: isProfilePage ? "default" : "pointer",
                }}
              />
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
            color="secondary"
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
