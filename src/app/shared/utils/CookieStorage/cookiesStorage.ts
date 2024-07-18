import Cookies from "js-cookie";

export const cookieUtils = {
  setItem: (key: string, value: any): void => {
    Cookies.set(key, JSON.stringify(value), { expires: 7 }); // cookies expiram em 7 dias
  },

  getItem: (key: string): any => {
    const item = Cookies.get(key);
    return item ? JSON.parse(item) : null;
  },

  removeItem: (key: string): void => {
    Cookies.remove(key);
  },

  getLikedPostsByUser: (userId: string): string[] => {
    const likes = JSON.parse(Cookies.get("likedPosts") || "{}");
    return likes[userId] || [];
  },

  setLikedPostsByUser: (userId: string, likedPosts: string[]): void => {
    const likes = JSON.parse(Cookies.get("likedPosts") || "{}");
    likes[userId] = likedPosts;
    Cookies.set("likedPosts", JSON.stringify(likes), { expires: 7 });
  },
};
