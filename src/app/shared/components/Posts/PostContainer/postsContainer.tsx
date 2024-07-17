import React, { useEffect, useState } from "react";
import { IPostData, IPostsContainerProps } from "@/app/shared/@types";
import Posts from "../posts";
import {
  getAllPosts,
  getAllPostsByUser,
} from "@/app/shared/services/api/postApi";

const PostsContainer: React.FC<IPostsContainerProps> = ({
  token,
  userId,
  refreshPosts,
}) => {
  const [posts, setPosts] = useState<IPostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = userId
          ? await getAllPostsByUser(userId, token)
          : await getAllPosts(token);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, [refreshPosts, userId, token]);

  return <Posts posts={posts} />;
};

export default PostsContainer;
