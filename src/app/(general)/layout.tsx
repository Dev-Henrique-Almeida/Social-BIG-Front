"use client";

import { usePathname } from "next/navigation";
import { AppThemeProvider, DrawerProvider } from "../shared/contexts";
import "../shared/styles/globals.scss";
import {
  AuthProvider,
  useAuthContext,
} from "../shared/contexts/Auth/AuthContext";
import useProtectedRoute from "../shared/hooks/Auth/useProtectedRoute";
import { CssBaseline } from "@mui/material";
import { MenuLateral } from "../shared/components/MenuLateral/menuLateral";

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const pathname = usePathname();
  const noMenuRoutes = ["/register", "/login"];

  const showMenuLateral = user && !noMenuRoutes.includes(pathname);

  useProtectedRoute();

  return (
    <>{showMenuLateral ? <MenuLateral>{children}</MenuLateral> : children}</>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <DrawerProvider>
          <CssBaseline />
          <Layout>{children}</Layout>
        </DrawerProvider>
      </AuthProvider>
    </AppThemeProvider>
  );
}
