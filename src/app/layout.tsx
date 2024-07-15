import type { Metadata } from "next";
import "./layout.scss";
import { AppThemeProvider } from "./shared/contexts";

export const metadata: Metadata = {
  title: "Aprendendo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="loginContainer">
          <AppThemeProvider>{children}</AppThemeProvider>
        </div>
      </body>
    </html>
  );
}
