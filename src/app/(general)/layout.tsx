"use client";

import { usePathname } from "next/navigation";
import { MenuLateral } from "../shared/components";
import { AppThemeProvider, DrawerProvider } from "../shared/contexts";
import "../shared/styles/globals.scss";
import { AuthProvider } from "../shared/contexts/Auth/AuthContext";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noMenuRoutes = ["/register", "/login"];

  const showMenuLateral = !noMenuRoutes.includes(pathname);

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
          <Layout>{children}</Layout>
        </DrawerProvider>
      </AuthProvider>
    </AppThemeProvider>
  );
}
