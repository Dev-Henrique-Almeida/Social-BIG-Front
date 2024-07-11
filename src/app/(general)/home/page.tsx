"use client";
import React from "react";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";

export default function Home() {
  const { user, token } = useAuthContext();

  return (
    <div>
      <h1>Home</h1>
      <p>Id: {user ? user.id : "No user ID"}</p>
      <p>Name: {user ? user.name : "No user name"}</p>
      <p>Email: {user ? user.email : "No user email"}</p>
      <p>Image: {user ? user.image : "No user email"}</p>
      <p>Token: {token}</p>
    </div>
  );
}
