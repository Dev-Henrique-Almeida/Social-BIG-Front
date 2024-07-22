"use client";
import { Button } from "@mui/material";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";
import { IFormEditProps } from "../../@types";
import { updateUser } from "../../services";
import React from "react";
import styles from "./formEdit.module.scss";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import InputField from "@/app/shared/components/InputField/inputField";
import useHandleChange from "../../hooks/HandleChange/useHandleChange";
import FormatBirthdate from "../../utils/ConvertDates/convertBirthdate";
import SelectField from "../SelectField/selectField";

export default function FormEdit({ user, token, onClose }: IFormEditProps) {
  const themeStyles = useThemeStyles();
  const { setUser } = useAuthContext();
  const { formData, handleChange } = useHandleChange(user);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const updatedUser = await updateUser(formData, user.id!, token);
      console.log(updatedUser);
      alert("Usuário atualizado com sucesso!");
      setUser(updatedUser);
      onClose!();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert(
        "Erro ao atualizar usuário. Verifique o console para mais detalhes."
      );
    }
  };

  return (
    <div
      className={styles.formEditContainer}
      style={{ backgroundColor: themeStyles.backgroundDefault }}
    >
      <form
        onSubmit={handleSubmit}
        className={styles.formEditForm}
        style={{ backgroundColor: themeStyles.backgroundPaper }}
      >
        <div className={styles.header}>
          <h1
            className={styles.formEditTitle}
            style={{ color: themeStyles.textColor }}
          >
            Editar Perfil
          </h1>
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
          type="email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          placeholder="Email"
          className={styles.inputField}
        />
        <InputField
          type="text"
          value={formData.occupation!}
          onChange={handleChange}
          name="occupation"
          placeholder="Ocupação"
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
          type="text"
          value={formData.address!}
          onChange={handleChange}
          name="address"
          placeholder="Endereço"
          className={styles.inputField}
        />
        <InputField
          type="tel"
          value={formData.phone!}
          onChange={handleChange}
          name="phone"
          placeholder="Telefone"
          className={styles.inputField}
        />
        <InputField
          type="text"
          value={formData.image!}
          onChange={handleChange}
          name="image"
          placeholder="Imagem"
          className={styles.inputField}
        />
        <SelectField
          value={formData.sex!}
          onChange={handleChange}
          name="sex"
          type="text"
          placeholder="Sexo"
          className={styles.inputField}
          options={[
            { value: "Male", label: "Masculino" },
            { value: "Female", label: "Feminino" },
          ]}
        />
        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles.formEditButton}
          >
            Salvar
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            color="primary"
            className={styles.formEditButton}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
