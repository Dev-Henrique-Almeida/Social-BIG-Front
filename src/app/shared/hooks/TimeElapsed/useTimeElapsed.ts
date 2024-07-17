import { useState, useEffect } from "react";

const useTimeElapsed = (createdAt: Date): string => {
  const [timeElapsed, setTimeElapsed] = useState<string>("");

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date();
      const elapsedTime = now.getTime() - createdAt.getTime();

      const seconds = Math.floor(elapsedTime / 1000);

      if (seconds < 60) {
        setTimeElapsed(`${seconds} segundos atrás`);
      } else {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
          setTimeElapsed(
            `${minutes} ${minutes === 1 ? "minuto" : "minutos"} atrás`
          );
        } else {
          const hours = Math.floor(minutes / 60);
          const remainingMinutes = minutes % 60;
          if (remainingMinutes === 0) {
            setTimeElapsed(`${hours} ${hours === 1 ? "hora" : "horas"} atrás`);
          } else {
            setTimeElapsed(
              `${hours} ${
                hours === 1 ? "hora" : "horas"
              } e ${remainingMinutes} ${
                remainingMinutes === 1 ? "minuto" : "minutos"
              } atrás`
            );
          }
        }
      }
    };

    calculateTimeElapsed();
    const interval = setInterval(calculateTimeElapsed, 60000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return timeElapsed;
};

export default useTimeElapsed;
