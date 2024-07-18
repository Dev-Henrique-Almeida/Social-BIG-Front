export const localStorageUtils = {
  setItem: (key: string, value: any): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  getItem: (key: string): any => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  },

  removeItem: (key: string): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },

  getLikedPostsByUser: (userId: string): string[] => {
    const likes = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    return likes[userId] || [];
  },

  setLikedPostsByUser: (userId: string, likedPosts: string[]): void => {
    const likes = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    likes[userId] = likedPosts;
    localStorage.setItem("likedPosts", JSON.stringify(likes));
  },
};
