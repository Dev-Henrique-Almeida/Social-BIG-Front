"use client";
import React from "react";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";
import { Typography } from "@mui/material";

export default function Home() {
  const { user, token } = useAuthContext();

  return (
    <div>
      <Typography variant="h3">Home</Typography>
      <Typography variant="body1">
        Id: {user ? user.id : "No user ID"}
      </Typography>
      <Typography variant="body1">
        Name: {user ? user.name : "No user name"}
      </Typography>
      <Typography variant="body1">
        Email: {user ? user.email : "No user email"}
      </Typography>
      <Typography variant="body1">
        Image: {user ? user.image : "No user email"}
      </Typography>
      <Typography variant="body1">Token: {token}</Typography>
    </div>
  );
}
