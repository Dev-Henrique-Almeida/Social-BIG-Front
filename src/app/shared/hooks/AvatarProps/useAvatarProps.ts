import { useAuthContext } from "../../contexts/Auth/AuthContext";
import { IAuthor, IUserData } from "../../@types";

const useAvatarProps = (author?: IAuthor | IUserData) => {
  const { user } = useAuthContext();

  const getAvatarProps = () => {
    const avatarUser = author || user;

    if (avatarUser && avatarUser.image) {
      return { src: avatarUser.image, alt: avatarUser.name };
    }
    return {
      alt: avatarUser ? avatarUser.name : "Desconhecido",
      src: avatarUser ? avatarUser.name : "",
    };
  };

  return getAvatarProps;
};

export default useAvatarProps;
