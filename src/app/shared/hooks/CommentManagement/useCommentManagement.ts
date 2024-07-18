import { useState } from "react";
import { ICommentData, IComment } from "../../@types";

const useCommentManagement = () => {
  const [visibleCommentsCount, setVisibleCommentsCount] = useState<{
    [postId: string]: number;
  }>({});

  const handleCommentAdded = (
    comment: ICommentData,
    user: { name?: string; image?: string }
  ) => {
    const newComment: IComment = {
      id: new Date().toISOString(),
      content: comment.content,
      author: {
        id: comment.authorId,
        name: user.name || "Anônimo",
        image: user.image || "",
      },
    };

    return newComment;
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

  return {
    visibleCommentsCount,
    handleCommentAdded,
    handleShowMoreComments,
    handleShowLessComments,
  };
};

export default useCommentManagement;
