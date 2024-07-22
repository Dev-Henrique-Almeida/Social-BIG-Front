import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Image, Close, LocationOn } from "@mui/icons-material";
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
import { deletePost, likePost, updatePost } from "../../services/api/postApi";
import { useAuthContext } from "@/app/shared/contexts";
import { cookieUtils } from "../../utils/CookieStorage/cookiesStorage";
import CommentInput from "./CommentInput/commentInput";
import useCommentManagement from "../../hooks/CommentManagement/useCommentManagement";
import CommentsList from "./CommentsList/commentsList";
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
  const [postIdToEdit, setPostIdToEdit] = useState<string | null>(null);
  const [editingPostContent, setEditingPostContent] = useState<string>("");
  const [editingPostLocation, setEditingPostLocation] = useState<string>("");
  const [editingPostImage, setEditingPostImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const handleEditPost = (post: IPostDataWithTimeElapsed) => {
    setEditingPostContent(post.text);
    setEditingPostLocation(post.location || "");
    setEditingPostImage(post.image || null);
    setPostIdToEdit(post.id);
    handleMenuClose();
  };

  const handleUpdatePost = async () => {
    if (postIdToEdit && token) {
      try {
        const updatedPost = await updatePost(
          {
            text: editingPostContent,
            location: editingPostLocation,
            image: editingPostImage || "",
            authorId: user?.id || "",
          },
          postIdToEdit,
          token
        );
        setFilteredPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postIdToEdit ? { ...p, ...updatedPost } : p
          )
        );
        setEditingPostContent("");
        setEditingPostLocation("");
        setEditingPostImage(null);
        setSelectedImage(null);
        setPostIdToEdit(null);
      } catch (error) {
        console.error("Erro ao atualizar o post:", error);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setEditingPostImage(null);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
                  <MenuItem onClick={() => handleEditPost(post)}>
                    Editar
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>Cancelar</MenuItem>
                </Menu>
              </div>
            )}
            {postIdToEdit === post.id ? (
              <div className={styles.editPost}>
                <label className={styles.placeholder}>Descrição</label>
                <div
                  className={styles.inputContainer}
                  style={{ backgroundColor: themeStyles.backgroundDefault }}
                >
                  <input
                    className={styles.input}
                    value={editingPostContent}
                    onChange={(e) => setEditingPostContent(e.target.value)}
                    placeholder="Descrição"
                  />
                </div>

                <label className={styles.placeholder}>Localização</label>
                <div
                  className={styles.inputContainer}
                  style={{ backgroundColor: themeStyles.backgroundDefault }}
                >
                  <input
                    className={styles.input}
                    value={editingPostLocation}
                    onChange={(e) => setEditingPostLocation(e.target.value)}
                    placeholder="Localização"
                  />
                </div>
                <div className={styles.frame3}>
                  <div className={styles.frame2}>
                    {!editingPostImage && (
                      <>
                        <IconButton
                          className={styles.iconButton}
                          onClick={handleImageClick}
                        >
                          <Image className={styles.icon} />
                        </IconButton>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </>
                    )}
                  </div>
                </div>
                {editingPostImage && (
                  <div className={styles.imagePreviewContainer}>
                    <div className={styles.imageWrapper}>
                      <img
                        src={editingPostImage}
                        alt="Pré-visualização"
                        className={styles.imagePreview}
                      />
                      <IconButton
                        className={styles.closeButton}
                        onClick={handleRemoveImage}
                      >
                        <Close className={styles.closeIcon} />
                      </IconButton>
                    </div>
                  </div>
                )}
                <div className={styles.editPostButtons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdatePost}
                  >
                    Atualizar
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setPostIdToEdit(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
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
