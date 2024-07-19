import { useState, useEffect } from "react";
import { IComment } from "../../@types";

const useCommentsWithTimeElapsed = (comments: IComment[]): IComment[] => {
  const [commentsWithTimeElapsed, setCommentsWithTimeElapsed] = useState<
    IComment[]
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
          if (hours < 24) {
            if (remainingMinutes === 0) {
              return `${hours} ${hours === 1 ? "hora" : "horas"} atrás`;
            } else {
              return `${hours} ${
                hours === 1 ? "hora" : "horas"
              } e ${remainingMinutes} ${
                remainingMinutes === 1 ? "minuto" : "minutos"
              } atrás`;
            }
          } else {
            const days = Math.floor(hours / 24);
            return `${days} ${days === 1 ? "dia" : "dias"} atrás`;
          }
        }
      }
    };

    const updatedComments = comments.map((comment) => {
      const createdAtDate = comment.createdAt
        ? new Date(comment.createdAt)
        : new Date();
      return {
        ...comment,
        timeElapsed: calculateTimeElapsed(createdAtDate),
      };
    });

    setCommentsWithTimeElapsed(updatedComments);
  }, [comments]);

  return commentsWithTimeElapsed;
};

export default useCommentsWithTimeElapsed;
