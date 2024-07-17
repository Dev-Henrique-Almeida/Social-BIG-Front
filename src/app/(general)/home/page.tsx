"use client";
import React, { useState } from "react";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";
import CreatePost from "@/app/shared/components/CreatePost/createPost";
import CardUsers from "@/app/shared/components/CardUsers/cardUsers";
import PostsContainer from "@/app/shared/components/Posts/PostContainer/postsContainer";
import styles from "./home.module.scss";

export default function Home() {
  const { user, token } = useAuthContext();
  const [refreshPosts, setRefreshPosts] = useState(false);

  if (!user) {
    return null;
  }

  const handleRefreshPosts = () => {
    setRefreshPosts((prev) => !prev);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <CreatePost
            user={user}
            token={token!}
            onPostCreated={handleRefreshPosts}
          />
          <PostsContainer token={token!} refreshPosts={refreshPosts} />
        </div>
        <div className={styles.rightSection}>
          <CardUsers user={user} token={token!} />
        </div>
      </div>
    </div>
  );
}
