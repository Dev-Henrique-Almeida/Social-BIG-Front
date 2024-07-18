import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IPostsProps, ICommentData, IComment } from "../../@types";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";
import usePostsWithTimeElapsed from "../../hooks/TimeElapsed/useTimeElapsed";
import styles from "./posts.module.scss";
import useAvatarProps from "../../hooks/AvatarProps/useAvatarProps";
import useProfileNavigation from "../../hooks/ProfileNavigation/useProfileNavigation";
import { deletePost, likePost } from "../../services/api/postApi";
import { useAuthContext } from "@/app/shared/contexts";
import { cookieUtils } from "../../utils/CookieStorage/cookiesStorage";
import CommentInput from "../CommentInput/commentInput";

const Posts: React.FC<IPostsProps> = ({ posts, isButton = false }) => {
  const { user, token } = useAuthContext();
  const [visiblePostsCount, setVisiblePostsCount] = useState(posts.length);
  const { isProfilePage, handlePickPerfil } = useProfileNavigation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const postsWithTimeElapsed = usePostsWithTimeElapsed(posts);
  const [filteredPosts, setFilteredPosts] = useState(postsWithTimeElapsed);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState<{
    [postId: string]: number;
  }>({});
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

  useEffect(() => {
    if (user?.id) {
      // Recuperando os likes dos cookies ao montar o componente
      const savedLikes = cookieUtils.getLikedPostsByUser(user.id);
      const initialLikedPosts = postsWithTimeElapsed
        .filter((post) => savedLikes.includes(post.id))
        .map((post) => post.id);
      setLikedPosts(initialLikedPosts);
    }
  }, [postsWithTimeElapsed, user?.id]);

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

  const handleLikePost = async (postId: string) => {
    if (token && user?.id) {
      try {
        const updatedPost = await likePost(postId, token, user.id);
        setFilteredPosts(
          filteredPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: updatedPost.likes,
                  likedByCurrentUser: updatedPost.likedByCurrentUser,
                }
              : post
          )
        );
        let updatedLikedPosts;
        if (likedPosts.includes(postId)) {
          updatedLikedPosts = likedPosts.filter((id) => id !== postId);
        } else {
          updatedLikedPosts = [...likedPosts, postId];
        }
        setLikedPosts(updatedLikedPosts);
        cookieUtils.setLikedPostsByUser(user.id, updatedLikedPosts);
      } catch (error) {
        console.error(`Erro ao dar like no post:`, error);
      }
    }
  };

  const handleCommentAdded = (comment: ICommentData) => {
    const newComment: IComment = {
      id: new Date().toISOString(), // Você pode usar um id único gerado de outra forma
      content: comment.content,
      author: {
        id: comment.authorId,
        name: user?.name || "Anônimo",
        image: user?.image || "",
      },
    };

    setFilteredPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === comment.postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    setVisibleCommentsCount((prev) => ({
      ...prev,
      [comment.postId]: (prev[comment.postId] || 2) + 1,
    }));
  };

  const handleShowMoreComments = (postId: string) => {
    setVisibleCommentsCount((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 2) + 2,
    }));
  };

  const handleShowLessComments = (postId: string) => {
    setVisibleCommentsCount((prev) => ({
      ...prev,
      [postId]: 2,
    }));
  };

  return (
    <div className={styles.posts}>
      {filteredPosts.length === 0 ? (
        <div
          className={styles.noPostsMessage}
          style={{
            backgroundColor: themeStyles.backgroundPaper,
            border: themeStyles.borderColor,
          }}
        >
          Nenhum post disponível no momento. Que tal criar um novo post ou
          voltar mais tarde?
        </div>
      ) : (
        filteredPosts.slice(0, visiblePostsCount).map((post) => (
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
                    border: "1px solid #d32f2f",
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
                      <span className={styles.postLocation}>
                        {post.location}
                      </span>
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
              <div
                className={`${styles.likeButton} ${
                  likedPosts.includes(post.id) ? styles.liked : ""
                }`}
                onClick={() =>
                  post.author.id !== user?.id && handleLikePost(post.id)
                }
              >
                <div className={styles.vector}></div>
                <div
                  className={`${styles.curtiu} ${
                    likedPosts.includes(post.id) ? styles.likedText : ""
                  }`}
                >
                  {likedPosts.includes(post.id) ? "Curtiu" : "Curtir"}
                </div>
                <div
                  className={`${styles.frame10} ${
                    likedPosts.includes(post.id) ? styles.likedCounter : ""
                  }`}
                  style={{
                    backgroundColor: likedPosts.includes(post.id)
                      ? "#d32f2f"
                      : themeStyles.backgroundDefault,
                  }}
                >
                  <div className={`${styles.likesCount}`}>{post.likes}</div>
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
                  <div className={styles.commentsCount}>
                    {post.comments.length}
                  </div>
                </div>
              </div>
            </div>
            <CommentInput
              postId={post.id}
              onCommentAdded={handleCommentAdded}
            />
            <div className={styles.commentsSection}>
              {post.comments
                .slice(0, visibleCommentsCount[post.id] || 2)
                .map((comment) => (
                  <div className={styles.comment} key={comment.id}>
                    <Avatar
                      sx={{
                        width: "32px",
                        height: "32px",
                        border: "1px solid #d32f2f",
                        cursor: isProfilePage ? "default" : "pointer",
                      }}
                      {...useAvatarProps(comment.author)()}
                      onClick={() => handlePickPerfil(comment.author.id)}
                    />
                    <div className={styles.commentContent}>
                      <div className={styles.commentAuthor}>
                        {comment.author.name}
                      </div>
                      <div className={styles.commentText}>
                        {comment.content}
                      </div>
                    </div>
                  </div>
                ))}
              {post.comments.length > (visibleCommentsCount[post.id] || 2) && (
                <div>
                  <Divider sx={{ paddingTop: "20px", marginBottom: "20px" }} />
                  <button
                    className={styles.showMoreCommentsButton}
                    onClick={() => handleShowMoreComments(post.id)}
                  >
                    Ver todos os comentários
                  </button>
                </div>
              )}
              {visibleCommentsCount[post.id] >= post.comments.length && (
                <div>
                  <Divider sx={{ paddingTop: "20px", marginBottom: "20px" }} />

                  <button
                    className={styles.showMoreCommentsButton}
                    onClick={() => handleShowLessComments(post.id)}
                  >
                    Ver menos comentários
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
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
