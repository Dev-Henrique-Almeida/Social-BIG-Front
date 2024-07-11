import Login from "./(general)/login/page";
import { AppThemeProvider } from "./shared/contexts";
import { AuthProvider } from "./shared/contexts/Auth/AuthContext";
import "./shared/styles/globals.scss";

export default function Home() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </AppThemeProvider>
  );
}
