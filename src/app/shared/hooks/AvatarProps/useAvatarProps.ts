import { useAuthContext } from "../../contexts/Auth/AuthContext";

const useAvatarProps = () => {
  const { user } = useAuthContext();

  const getAvatarProps = () => {
    if (user && user.image) {
      return { src: user.image, alt: user.name };
    }
    return {
      alt: user ? user.name : "Desconhecido",
      src: user ? user.name : "",
    };
  };

  return getAvatarProps;
};

export default useAvatarProps;
