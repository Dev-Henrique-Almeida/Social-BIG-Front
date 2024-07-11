"use client";
import React from "react";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";

export default function Perfil() {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>Perfil</h1>
      <p>Id: {user ? user.name : "Sem nome"}</p>
      <p>Name: {user ? user.name : "No user name"}</p>
      <p>Email: {user ? user.email : "No user email"}</p>
    </div>
  );
}
