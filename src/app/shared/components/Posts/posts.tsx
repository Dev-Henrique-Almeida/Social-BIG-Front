import React from "react";
import { Avatar } from "@mui/material";
import styles from "./posts.module.scss";
import { IPostsProps } from "../../@types";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";

const Posts: React.FC<IPostsProps> = ({ posts }) => {
  const themeStyles = useThemeStyles();
  return (
    <div className={styles.posts}>
      {posts.map((post) => (
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
                src={post.author.image}
                alt={`${post.author.name}'s avatar`}
              />
            </div>
            <div className={styles.postHeader}>
              <div className={styles.postAuthor}>{post.author.name}</div>
              <div className={styles.postTimeLocation}>
                {post.createdAt}{" "}
                {post.location && (
                  <>
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
    </div>
  );
};

export default Posts;
