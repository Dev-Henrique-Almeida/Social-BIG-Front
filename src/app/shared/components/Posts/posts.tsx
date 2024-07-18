import React, { useEffect, useState } from "react";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IPostsProps } from "../../@types";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";
import usePostsWithTimeElapsed from "../../hooks/TimeElapsed/useTimeElapsed";
import styles from "./posts.module.scss";
import useAvatarProps from "../../hooks/AvatarProps/useAvatarProps";
import useProfileNavigation from "../../hooks/ProfileNavigation/useProfileNavigation";
import { deletePost } from "../../services/api/postApi";
import { useAuthContext } from "@/app/shared/contexts";

const Posts: React.FC<IPostsProps> = ({ posts, isButton = false }) => {
  const { user, token } = useAuthContext();
  const [visiblePostsCount, setVisiblePostsCount] = useState(posts.length);
  const { isProfilePage, handlePickPerfil } = useProfileNavigation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const postsWithTimeElapsed = usePostsWithTimeElapsed(posts);
  const [filteredPosts, setFilteredPosts] = useState(postsWithTimeElapsed);
  const themeStyles = useThemeStyles();

  useEffect(() => {
    if (isButton) {
      setVisiblePostsCount(2);
    } else {
      setVisiblePostsCount(posts.length);
    }
  }, [isButton, posts.length]);

  useEffect(() => {
    setFilteredPosts(postsWithTimeElapsed);
  }, [postsWithTimeElapsed]);

  const handleShowMorePosts = () => {
    setVisiblePostsCount((prevCount) => prevCount + 2);
  };

  const handleShowLessPosts = () => {
    setVisiblePostsCount(2);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    postId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setPostIdToDelete(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setPostIdToDelete(null);
  };

  const handleDeletePost = async () => {
    if (postIdToDelete && token) {
      try {
        const message = await deletePost(postIdToDelete, token);
        console.log(message);
        setFilteredPosts(
          filteredPosts.filter((post) => post.id !== postIdToDelete)
        );
      } catch (error) {
        console.error(error);
      } finally {
        handleMenuClose();
      }
    }
  };

  return (
    <div className={styles.posts}>
      {filteredPosts.slice(0, visiblePostsCount).map((post) => (
        <div
          className={styles.post}
          style={{
            backgroundColor: themeStyles.backgroundPaper,
            border: themeStyles.borderColor,
            position: "relative",
          }}
          key={post.id}
        >
          {post.author.id === user?.id && (
            <div className={styles.postOptions}>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(e) => handleMenuOpen(e, post.id)}
                style={{ borderRadius: "50%", padding: "4px" }}
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    boxShadow: "none",
                    border: themeStyles.borderColor,
                  },
                }}
              >
                <MenuItem onClick={handleDeletePost}>Excluir</MenuItem>
                <MenuItem onClick={handleMenuClose}>Cancelar</MenuItem>
              </Menu>
            </div>
          )}
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
      {isButton && visiblePostsCount < filteredPosts.length && (
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
        visiblePostsCount >= filteredPosts.length &&
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
