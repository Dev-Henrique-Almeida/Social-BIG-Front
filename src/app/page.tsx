"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppThemeProvider } from "./shared/contexts";
import { AuthProvider } from "./shared/contexts/Auth/AuthContext";
import Login from "./(general)/login/page";
import "./shared/styles/globals.scss";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <AppThemeProvider>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </AppThemeProvider>
  );
}
