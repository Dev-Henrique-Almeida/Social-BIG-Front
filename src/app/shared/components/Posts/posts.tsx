import React, { useState, useEffect } from "react";
import {
  IPostsProps,
  IPostDataWithTimeElapsed,
  ICommentData,
} from "../../@types";
import { useAuthContext } from "@/app/shared/contexts";
import {
  deletePost,
  likePost,
  updatePost,
} from "../../services/api/Post/postApi";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";
import usePostsWithTimeElapsed from "../../hooks/TimeElapsed/useTimeElapsed";
import { cookieUtils } from "@/app/shared/utils/CookieStorage/cookiesStorage";
import styles from "./posts.module.scss";
import ShowMoreButton from "../ShowMoreButton/showMoreButton";
import PostOptions from "./PostOptions/postOptions";
import EditPostForm from "./EditPostForm/editPostForm";
import PostHeader from "./PostHeader/postHeader";
import PostContent from "./PostContent/postContent";
import PostFooter from "./PostFooter/postFooter";
import CommentInput from "./CommentInput/commentInput";
import CommentsList from "./CommentsList/commentsList";
import useProfileNavigation from "../../hooks/ProfileNavigation/useProfileNavigation";

const Posts: React.FC<IPostsProps> = ({ posts, isButton = false }) => {
  const { user, token } = useAuthContext();
  const themeStyles = useThemeStyles();
  const postsWithTimeElapsed = usePostsWithTimeElapsed(posts);
  const [filteredPosts, setFilteredPosts] =
    useState<IPostDataWithTimeElapsed[]>(postsWithTimeElapsed);
  const [visiblePostsCount, setVisiblePostsCount] = useState(posts.length);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const { handlePickPerfil } = useProfileNavigation();
  const [postIdToEdit, setPostIdToEdit] = useState<string | null>(null);
  const [visibleCommentsCountMap, setVisibleCommentsCountMap] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    setVisiblePostsCount(isButton ? 2 : posts.length);
  }, [isButton, posts.length]);

  useEffect(() => {
    const sortedPosts = postsWithTimeElapsed.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setFilteredPosts(sortedPosts);
  }, [postsWithTimeElapsed]);

  useEffect(() => {
    if (user?.id) {
      const savedLikes = cookieUtils.getLikedPostsByUser(user.id);
      setLikedPosts(savedLikes);
    }
  }, [user?.id]);

  const handleShowMorePosts = () => setVisiblePostsCount((prev) => prev + 2);
  const handleShowLessPosts = () => setVisiblePostsCount(2);

  const handleShowMoreComments = (postId: string) => {
    setVisibleCommentsCountMap((prevState) => ({
      ...prevState,
      [postId]: (prevState[postId] || 2) + 2,
    }));
  };

  const handleShowLessComments = (postId: string) => {
    setVisibleCommentsCountMap((prevState) => ({
      ...prevState,
      [postId]: 2,
    }));
  };

  const handleDeletePost = async (postId: string) => {
    if (token) {
      const confirmed = window.confirm(
        "Você realmente quer excluir este post?"
      );
      if (!confirmed) return;

      try {
        await deletePost(postId, token);
        alert("Post excluído com sucesso!");
        setFilteredPosts(filteredPosts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdatePost = async (updatedPost: IPostDataWithTimeElapsed) => {
    if (token && user?.id) {
      try {
        await updatePost(
          {
            text: updatedPost.text,
            location: updatedPost.location,
            image: updatedPost.image || "",
            authorId: user.id,
          },
          updatedPost.id,
          token
        );
        setFilteredPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === updatedPost.id ? { ...post, ...updatedPost } : post
          )
        );
        setPostIdToEdit(null);
      } catch (error) {
        console.error("Erro ao atualizar o post:", error);
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
        const updatedLikedPosts = likedPosts.includes(postId)
          ? likedPosts.filter((id) => id !== postId)
          : [...likedPosts, postId];
        setLikedPosts(updatedLikedPosts);
        cookieUtils.setLikedPostsByUser(user.id, updatedLikedPosts);
      } catch (error) {
        console.error(`Erro ao dar like no post:`, error);
      }
    }
  };

  const handleCommentAddedToPost = (comment: ICommentData) => {
    const postId = comment.postId;
    const newComment = {
      ...comment,
      id: new Date().toISOString(),
      author: {
        id: comment.authorId,
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
            }}
            key={post.id}
          >
            {post.author.id === user?.id && (
              <div className={styles.postOptions}>
                <PostOptions
                  post={post}
                  onEdit={() => setPostIdToEdit(post.id)}
                  onDelete={() => handleDeletePost(post.id)}
                />
              </div>
            )}
            {postIdToEdit === post.id ? (
              <EditPostForm
                post={post}
                onCancel={() => setPostIdToEdit(null)}
                onSave={handleUpdatePost}
              />
            ) : (
              <>
                <PostHeader
                  post={post}
                  onProfileClick={(authorId) => {
                    handlePickPerfil(authorId);
                  }}
                />
                <PostContent post={post} />
                <PostFooter
                  post={post}
                  onLike={handleLikePost}
                  isLiked={likedPosts.includes(post.id)}
                />
                <CommentInput
                  postId={post.id}
                  onCommentAdded={handleCommentAddedToPost}
                />
                <CommentsList
                  comments={post.comments}
                  visibleCommentsCount={visibleCommentsCountMap[post.id] || 2}
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
