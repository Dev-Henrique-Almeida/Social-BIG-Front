"use client";

import { useState } from "react";

const useRefreshPosts = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);

  const handleRefreshPosts = () => {
    setRefreshPosts((prev) => !prev);
  };

  return {
    refreshPosts,
    handleRefreshPosts,
  };
};

export default useRefreshPosts;
