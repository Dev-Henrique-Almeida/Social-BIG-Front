import { useState, useEffect } from "react";
import { IPostData, IPostDataWithTimeElapsed } from "../../@types";

const usePostsWithTimeElapsed = (
  posts: IPostData[]
): IPostDataWithTimeElapsed[] => {
  const [postsWithTimeElapsed, setPostsWithTimeElapsed] = useState<
    IPostDataWithTimeElapsed[]
  >([]);

  useEffect(() => {
    const calculateTimeElapsed = (createdAt: Date): string => {
      const now = new Date();
      const elapsedTime = now.getTime() - createdAt.getTime();
      const seconds = Math.floor(elapsedTime / 1000);

      if (seconds < 60) {
        return `${seconds} segundos atrás`;
      } else {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
          return `${minutes} ${minutes === 1 ? "minuto" : "minutos"} atrás`;
        } else {
          const hours = Math.floor(minutes / 60);
          const remainingMinutes = minutes % 60;
          if (remainingMinutes === 0) {
            return `${hours} ${hours === 1 ? "hora" : "horas"} atrás`;
          } else {
            return `${hours} ${
              hours === 1 ? "hora" : "horas"
            } e ${remainingMinutes} ${
              remainingMinutes === 1 ? "minuto" : "minutos"
            } atrás`;
          }
        }
      }
    };

    const updatedPosts = posts.map((post) => ({
      ...post,
      timeElapsed: calculateTimeElapsed(new Date(post.createdAt)),
    }));

    setPostsWithTimeElapsed(updatedPosts);
  }, [posts]);

  return postsWithTimeElapsed;
};

export default usePostsWithTimeElapsed;
