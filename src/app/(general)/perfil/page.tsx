"use client";
import React from "react";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";
import { Input, Typography, Box } from "@mui/material";
import useHandleChange from "@/app/shared/hooks/handleChange/useHandleChange";

export default function Perfil() {
  const { user } = useAuthContext();

  const { formData, handleChange } = useHandleChange(user || {});

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Perfil
      </Typography>
      <Box>
        <Input
          fullWidth
          title="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <Input
          fullWidth
          title="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <Input
          fullWidth
          title="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
