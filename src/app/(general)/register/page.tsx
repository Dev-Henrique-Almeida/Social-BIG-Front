"use client";
import { Button, useTheme } from "@mui/material";
import { createUser } from "../../shared/services";
import useHandleChange from "../../shared/hooks/handleChange/useHandleChange";

export default function Register() {
  const theme = useTheme();
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
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário. Verifique o console para mais detalhes.");
    }
  };

  return (
    <div>
      <h1 style={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
        Registro
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          value={formData.name}
          placeholder="Nome"
        />
        <input
          onChange={handleChange}
          type="text"
          value={formData.username}
          placeholder="Username"
        />
        <input
          onChange={handleChange}
          type="text"
          value={formData.email}
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          type="date" // Mudar para date
          value={formData.birthdate}
          placeholder="Data de Nascimento"
        />

        <input
          onChange={handleChange}
          type="password" // Mudar para password
          value={formData.password}
          placeholder="Senha"
        />

        <input
          onChange={handleChange}
          type="password"
          value={formData.confirmPassword}
          placeholder="Confirmar Senha"
        />

        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
