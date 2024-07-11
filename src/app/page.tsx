import Login from "./(general)/login/page";
import { AppThemeProvider } from "./shared/contexts";
import "./styles/globals.scss";

export default function Home() {
  return (
    <AppThemeProvider>
      <Login />
    </AppThemeProvider>
  );
}
