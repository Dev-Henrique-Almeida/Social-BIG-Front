"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/app/shared/contexts";
import CreatePost from "@/app/shared/components/Posts/CreatePost/createPost";
import PostsContainer from "@/app/shared/components/Posts/PostContainer/postsContainer";
import CardUsers from "@/app/shared/components/CardUsers/cardUsers";
import styles from "./home.module.scss";

export default function Home() {
  const { user, token } = useAuthContext();
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!user) {
    return null;
  }

  const handleRefreshPosts = () => {
    setRefreshPosts((prev) => !prev);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        {isMobile ? (
          <>
            <div className={styles.rightSection + " " + styles.mobileOrder}>
              <CardUsers user={user} token={token!} />
            </div>
            <div className={styles.leftSection}>
              <CreatePost
                user={user}
                token={token!}
                onPostCreated={handleRefreshPosts}
              />
              <PostsContainer token={token!} refreshPosts={refreshPosts} />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
