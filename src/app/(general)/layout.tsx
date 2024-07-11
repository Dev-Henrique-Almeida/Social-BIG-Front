import type { Metadata } from "next";
import { MenuLateral } from "../shared/components";
import { AppThemeProvider, DrawerProvider } from "../shared/contexts";
import "../shared/styles/globals.scss";
import { AuthProvider } from "../shared/contexts/Auth/AuthContext";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <DrawerProvider>
          <MenuLateral>{children}</MenuLateral>
        </DrawerProvider>
      </AuthProvider>
    </AppThemeProvider>
  );
}
