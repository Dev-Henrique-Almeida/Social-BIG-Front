"use client";
import React from "react";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";
import CreatePost from "@/app/shared/components/CreatePost/createPost";
import CardUsers from "@/app/shared/components/CardUsers/cardUsers";
import styles from "./home.module.scss"; // Importa o CSS

export default function Home() {
  const { user, token } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.createPost}>
        <CreatePost user={user} token={token!} />
      </div>
      <div className={styles.cardUsers}>
        <CardUsers user={user} token={token!} />
      </div>
    </div>
  );
}
