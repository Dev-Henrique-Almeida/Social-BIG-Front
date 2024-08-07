"use client";

import { AppThemeProvider, DrawerProvider } from "../shared/contexts";
import "../shared/styles/globals.scss";
import {
  AuthProvider,
  useAuthContext,
} from "../shared/contexts/Auth/AuthContext";
import useProtectedRoute from "../shared/hooks/Auth/useProtectedRoute";
import { CssBaseline } from "@mui/material";
import { MenuLateral } from "../shared/components/Tema/MenuLateral/menuLateral";
import { usePathname } from "next/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  const { isProtectedRoute } = useProtectedRoute();

  if (isProtectedRoute) {
    return null; // Não renderiza nada se o usuário não estiver logado e estiver tentando acessar uma rota protegida
  }

  const { user } = useAuthContext();
  const pathname = usePathname();
  const noMenuRoutes = ["/register", "/login"];
  const showMenuLateral = user && !noMenuRoutes.includes(pathname);

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
