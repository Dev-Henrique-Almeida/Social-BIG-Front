import { useEffect, useState } from "react";
import { IPostData, IPostsContainerProps } from "@/app/shared/@types";

import Posts from "../posts";
import { getAllPosts, getAllPostsByUser } from "@/app/shared/services";

const PostsContainer: React.FC<IPostsContainerProps> = ({
  token,
  userId,
  refreshPosts,
  isButton = false,
}) => {
  const [posts, setPosts] = useState<IPostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = userId
          ? await getAllPostsByUser(userId, token)
          : await getAllPosts(token);
        // Ordenar posts do mais recente para o mais antigo
        const sortedPosts = fetchedPosts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, [refreshPosts]); /* , userId, token */

  return <Posts posts={posts} isButton={isButton} />;
};

export default PostsContainer;
