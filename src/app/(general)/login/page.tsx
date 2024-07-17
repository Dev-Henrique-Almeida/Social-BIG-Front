"use client";

import { useRouter } from "next/router";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import { useAuthContext } from "@/app/shared/contexts";
import useHandleChange from "@/app/shared/hooks/HandleChange/useHandleChange";
import { loginUser } from "@/app/shared/services";
import ChangeTheme from "@/app/shared/components/ChangeTheme/changeTheme";
import InputField from "@/app/shared/components/InputField/inputField";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import styles from "./login.module.scss";

const Login = () => {
  const router = useRouter();
  const themeStyles = useThemeStyles();
  const { setUser, setToken } = useAuthContext();
  const { formData, handleChange } = useHandleChange();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await loginUser(formData);
      console.log(data.token);
      console.log(data.user.id);

      setUser(data.user);
      setToken(data.token);

      router.push("/home");
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  };

  return (
    <div
      className={styles.loginContainer}
      style={{ backgroundColor: themeStyles.backgroundDefault }}
    >
      <form
        onSubmit={handleSubmit}
        className={styles.loginForm}
        style={{ backgroundColor: themeStyles.backgroundPaper }}
      >
        <div className={styles.header}>
          <h1
            className={styles.loginTitle}
            style={{ color: themeStyles.textColor }}
          >
            Login
          </h1>
          <ChangeTheme />
        </div>
        <InputField
          type="text"
          value={formData.username}
          onChange={handleChange}
          name="username"
          placeholder="Username"
          className={styles.inputField}
        />
        <InputField
          type="password"
          value={formData.password!}
          onChange={handleChange}
          name="password"
          placeholder="Senha"
          className={styles.inputField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.loginButton}
        >
          Entrar
        </Button>
        <div className={styles.registerContainer}>
          <Typography
            sx={{
              color: themeStyles.textColor,
            }}
          >
            Não possui uma conta?{" "}
            <Link
              href="/register"
              className={styles.registerLink}
              color="primary"
            >
              Crie aqui
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default Login;
