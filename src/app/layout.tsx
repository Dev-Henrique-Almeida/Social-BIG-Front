import type { Metadata } from "next";
import "./layout.scss";

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
        <div className="loginContainer">{children}</div>
      </body>
    </html>
  );
}
