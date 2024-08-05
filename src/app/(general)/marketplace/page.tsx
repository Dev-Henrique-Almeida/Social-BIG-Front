"use client";
import CardContainer from "@/app/shared/components/CardContainer/cardContainer";
import { useAuthContext } from "@/app/shared/contexts";
import React from "react";

export default function Marketplace() {
  const { token } = useAuthContext();

  return (
    <div>
      <CardContainer token={token!} />
    </div>
  );
}
