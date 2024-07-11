"use client";
import React from "react";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";
import { Box, Typography } from "@mui/material";

export default function Home() {
  const { user, token } = useAuthContext();

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h3">Home</Typography>
      <Typography variant="body1">Id: {user.id}</Typography>
      <Typography variant="body1">Name: {user.name}</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <Typography variant="body1">Image: {user.image}</Typography>
      <Typography variant="body1">Token: {token}</Typography>
    </Box>
  );
}
