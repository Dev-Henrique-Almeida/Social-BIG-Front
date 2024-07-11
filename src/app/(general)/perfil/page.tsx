"use client";
import React from "react";
import { Input, Typography } from "@mui/material";
import { useAuthenticatedUser } from "@/app/shared/hooks/Auth";
import { useRouter } from "next/navigation";

export default function Perfil() {
  const router = useRouter();
  const auth = useAuthenticatedUser();

  if (!auth) {
    router.push("/login");
    return null;
  }

  const { user, token } = auth;

  return (
    <div>
      <Typography variant="h3">Perfil</Typography>

      <Input value={user.id} />

      <Typography variant="body1">Name: {user.name}</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <Typography variant="body1">Image: {user.image}</Typography>
      <Typography variant="body1">Token: {token}</Typography>
    </div>
  );
}
