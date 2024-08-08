"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/app/shared/contexts";
import CreatePost from "@/app/shared/components/Posts/CreatePost/createPost";
import PostsContainer from "@/app/shared/components/Posts/PostContainer/postsContainer";
import CardUsers from "@/app/shared/components/CardUsers/cardUsers";
import styles from "./home.module.scss";
import CardDestaque from "@/app/shared/components/CardDestaque/cardDestaque";

export default function Home() {
  const { user, token } = useAuthContext();
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCardUsers, setShowCardUsers] = useState(true);

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
      <div
        className={`${styles.content} ${
          !showCardUsers ? styles.fullWidth : ""
        }`}
      >
        {isMobile ? (
          <>
            {showCardUsers && (
              <div className={styles.rightSectionMobile}>
                <CardUsers user={user} token={token!} />
                <div className={styles.spacer}></div>{" "}
                <CardDestaque token={token!} />
              </div>
            )}
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
            {showCardUsers && (
              <div className={styles.rightSection}>
                <CardUsers user={user} token={token!} />
                <div className={styles.spacer}></div>{" "}
                <CardDestaque token={token!} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
