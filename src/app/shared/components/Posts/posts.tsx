import React, { useState, useEffect } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  IPostsProps,
  IPostDataWithTimeElapsed,
  IComment,
  ICommentData,
} from "../../@types";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";
import usePostsWithTimeElapsed from "../../hooks/TimeElapsed/useTimeElapsed";
import styles from "./posts.module.scss";
import useAvatarProps from "../../hooks/AvatarProps/useAvatarProps";
import useProfileNavigation from "../../hooks/ProfileNavigation/useProfileNavigation";
import { deletePost, likePost } from "../../services/api/postApi";
import { useAuthContext } from "@/app/shared/contexts";
import { cookieUtils } from "../../utils/CookieStorage/cookiesStorage";
import CommentInput from "../CommentInput/commentInput";
import useCommentManagement from "../../hooks/CommentManagement/useCommentManagement";
import CommentsList from "../CommentsList/commentsList";
import ShowMoreButton from "../ShowMoreButton/showMoreButton";

const Posts: React.FC<IPostsProps> = ({ posts, isButton = false }) => {
  const { user, token } = useAuthContext();
  const { isProfilePage, handlePickPerfil } = useProfileNavigation();
  const {
    visibleCommentsCount,
    handleShowMoreComments,
    handleShowLessComments,
  } = useCommentManagement();
  const [visiblePostsCount, setVisiblePostsCount] = useState(posts.length);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const postsWithTimeElapsed = usePostsWithTimeElapsed(posts);
  const [filteredPosts, setFilteredPosts] =
    useState<IPostDataWithTimeElapsed[]>(postsWithTimeElapsed);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const themeStyles = useThemeStyles();

  useEffect(() => {
    if (isButton) {
      setVisiblePostsCount(2);
    } else {
      setVisiblePostsCount(posts.length);
    }
  }, [isButton, posts.length]);

  useEffect(() => {
    const sortedPosts = postsWithTimeElapsed.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setFilteredPosts(sortedPosts);
  }, [postsWithTimeElapsed]);

  useEffect(() => {
    if (user?.id) {
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

  const handleCommentAddedToPost = (
    postId: string,
    newCommentData: ICommentData
  ) => {
    const newComment: IComment = {
      ...newCommentData,
      id: new Date().toISOString(),
      author: {
        id: newCommentData.authorId,
        name: user?.name || "",
        image: user?.image || "",
      },
    };

    setFilteredPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [newComment, ...post.comments] }
          : post
      )
    );
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
              onCommentAdded={(comment) =>
                handleCommentAddedToPost(post.id, comment)
              }
            />
            <CommentsList
              comments={post.comments}
              visibleCommentsCount={visibleCommentsCount[post.id] || 2}
              postId={post.id}
              onShowMoreComments={handleShowMoreComments}
              onShowLessComments={handleShowLessComments}
            />
          </div>
        ))
      )}
      {isButton && visiblePostsCount < filteredPosts.length && (
        <ShowMoreButton isShowMore={true} onClick={handleShowMorePosts} />
      )}
      {isButton &&
        visiblePostsCount >= filteredPosts.length &&
        visiblePostsCount > 2 && (
          <ShowMoreButton isShowMore={false} onClick={handleShowLessPosts} />
        )}
    </div>
  );
};

export default Posts;
