"use client";

import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/shared/contexts";
import { createUser } from "@/app/shared/services";
import ChangeTheme from "@/app/shared/components/ChangeTheme/changeTheme";
import InputField from "@/app/shared/components/InputField/inputField";
import useHandleChange from "@/app/shared/hooks/HandleChange/useHandleChange";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import FormatBirthdate from "@/app/shared/utils/ConvertDates/convertBirthdate";
import Link from "next/link";
import styles from "./register.module.scss";

export default function Register() {
  const router = useRouter();
  const themeStyles = useThemeStyles();
  const { setUser, setToken } = useAuthContext();
  const { formData, handleChange } = useHandleChange();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("As senhas não coincidem");
      alert("As senhas não coincidem");
      return;
    }

    try {
      const data = await createUser(formData);
      console.log(data);
      alert("Usuário criado com sucesso!");
      setUser(data.user);
      setToken(data.token);
      router.push("/home");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário. Verifique o console para mais detalhes.");
    }
  };

  return (
    <div
      className={styles.registerContainer}
      style={{ backgroundColor: themeStyles.backgroundDefault }}
    >
      <form
        onSubmit={handleSubmit}
        className={styles.registerForm}
        style={{ backgroundColor: themeStyles.backgroundPaper }}
      >
        <div className={styles.header}>
          <h1
            className={styles.registerTitle}
            style={{ color: themeStyles.textColor }}
          >
            Registro
          </h1>
          <ChangeTheme />
        </div>
        <InputField
          type="text"
          value={formData.name}
          onChange={handleChange}
          name="name"
          placeholder="Nome"
          className={styles.inputField}
        />
        <InputField
          type="text"
          value={formData.username}
          onChange={handleChange}
          name="username"
          placeholder="Username"
          className={styles.inputField}
        />
        <InputField
          type="email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          placeholder="Email"
          className={styles.inputField}
        />
        <InputField
          type="date"
          value={FormatBirthdate(formData.birthdate)}
          onChange={handleChange}
          name="birthdate"
          placeholder="Data de Nascimento"
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
        <InputField
          type="password"
          value={formData.confirmPassword!}
          onChange={handleChange}
          name="confirmPassword"
          placeholder="Confirmar Senha"
          className={styles.inputField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.registerButton}
        >
          Cadastrar
        </Button>
        <div className={styles.loginContainer}>
          <Typography
            sx={{
              color: themeStyles.textColor,
            }}
          >
            Já possui uma conta?{" "}
            <Link href="/login" className={styles.loginLink} color="primary">
              Entre aqui
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
}
