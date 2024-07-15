"use client";
import React from "react";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";
import CreatePost from "@/app/shared/components/CreatePost/createPost";

export default function Home() {
  const { user, token } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <>
      <CreatePost user={user} token={token!} />
    </>
  );
}
