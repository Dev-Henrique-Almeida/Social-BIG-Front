"use client";
import React from "react";
import { Button, Typography } from "@mui/material";
import useHandleChange from "../../shared/hooks/HandleChange/useHandleChange";
import { loginUser } from "../../shared/services";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/app/shared/contexts";
import styles from "./login.module.scss";
import ChangeTheme from "@/app/shared/components/changeTheme/changeTheme";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import InputField from "@/app/shared/components/inputField/inputField";

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
          value={formData.password}
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
