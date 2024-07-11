"use client";
import { Button, useTheme } from "@mui/material";
import useHandleChange from "../../shared/hooks/handleChange/useHandleChange";
import { loginUser } from "../../shared/services";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const theme = useTheme();
  const { formData, handleChange } = useHandleChange();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await loginUser(formData);
      console.log(data.token);
      router.push("/home");
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  };
  return (
    <div>
      <h1 style={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.username}
          onChange={handleChange}
          name="username"
          placeholder="Username"
        ></input>
        <input
          type="text"
          value={formData.password}
          onChange={handleChange}
          name="password"
          placeholder="Senha"
        ></input>
        <Button type="submit" variant="contained" color="primary">
          Entrar
        </Button>
      </form>
    </div>
  );
}
