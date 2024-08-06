"use client";
import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";
import styles from "./formEdit.module.scss";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import { IFormEditProps } from "@/app/shared/@types";
import { updateUser } from "@/app/shared/services";
import InputField from "../inputField/inputField";
import FormatBirthdate from "@/app/shared/utils/ConvertDates/convertBirthdate";
import SelectField from "../../SelectField/selectField";
import useHandleChange from "@/app/shared/hooks/HandleChangeProfile/useHandleChangeProfile";
import { Close } from "@mui/icons-material";

export default function FormEdit({ user, token, onClose }: IFormEditProps) {
  const themeStyles = useThemeStyles();
  const { setUser } = useAuthContext();
  const { formData, handleChange, setFormData } = useHandleChange(user);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.image || null
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Remova o campo 'image' se não houver uma imagem
      const { image, ...otherData } = formData;
      const dataToUpdate = image ? formData : otherData;

      const updatedUser = await updateUser(dataToUpdate, user.id!, token);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, image: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

        <div className={styles.imageUploadContainer}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept="image/*"
          />
          <Button
            variant="contained"
            onClick={handleImageClick}
            className={styles.uploadButton}
          >
            Escolher Imagem
          </Button>
          {imagePreview && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={imagePreview}
                alt="Pré-visualização"
                className={styles.imagePreview}
              />
              <Button
                onClick={handleRemoveImage}
                className={styles.removeImageButton}
              >
                <Close className={styles.removeImageIcon} />
              </Button>
            </div>
          )}
        </div>

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
