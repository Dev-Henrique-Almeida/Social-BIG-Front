"use client";
import React, { useState, useRef } from "react";
import { Button, Alert } from "@mui/material";
import { Close } from "@mui/icons-material";
import styles from "./editMarketForm.module.scss";
import { IMarketData } from "@/app/shared/@types";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import InputField from "../../Profile/inputField/inputField";
import useHandleChange from "@/app/shared/hooks/HandleChangeCard/useHandleChangeCard";
import useCurrency from "@/app/shared/hooks/RealCurrency/useCurrency";

interface EditMarketFormProps {
  market: IMarketData;
  onCancel: () => void;
  onSave: (updatedMarket: IMarketData) => void;
}

const EditMarketForm: React.FC<EditMarketFormProps> = ({
  market,
  onCancel,
  onSave,
}) => {
  const themeStyles = useThemeStyles();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const initialFormData: IMarketData = {
    ...market,
    price: market.price || 0,
    name: market.name || "",
    description: market.description || "",
    image: market.image || "",
  };

  const { formData, handleChange, setFormData } =
    useHandleChange<IMarketData>(initialFormData);

  const [imagePreview, setImagePreview] = useState<string | null>(
    market.image || null
  );
  const [nameError, setNameError] = useState<string | null>(null);
  const { formatCurrency } = useCurrency();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.name.length > 45) {
      setNameError("O título deve ter no máximo 45 caracteres.");
      return;
    }
    onSave(formData);
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
    <div className={styles.editMarketContainer}>
      <form
        onSubmit={handleSubmit}
        className={styles.editMarketForm}
        style={{ backgroundColor: themeStyles.backgroundPaper }}
      >
        <div className={styles.header}>
          <h1
            className={styles.editMarketTitle}
            style={{ color: themeStyles.textColor }}
          >
            Editar Anúncio
          </h1>
        </div>
        <div className={styles.inputContainer}>
          <InputField
            type="text"
            value={formData.name}
            onChange={(e) => {
              handleChange(e);
              if (e.target.value.length > 45) {
                setNameError("O título deve ter no máximo 45 caracteres.");
              } else {
                setNameError(null);
              }
            }}
            name="name"
            placeholder="Nome"
            className={`${styles.inputField} ${
              nameError ? styles.inputFieldError : ""
            }`}
          />
          {nameError && <span className={styles.errorText}>{nameError}</span>}
        </div>
        <div className={styles.inputContainer}>
          <InputField
            type="text"
            value={formData.description}
            onChange={handleChange}
            name="description"
            placeholder="Descrição"
            className={styles.inputField}
          />
        </div>
        <InputField
          type="text"
          value={formatCurrency(formData.price)}
          onChange={(e) => {
            const numericValue = parseFloat(
              e.target.value
                .replace("R$", "")
                .replace(".", "")
                .replace(",", ".")
            );
            setFormData({ ...formData, price: numericValue });
          }}
          name="price"
          placeholder="Preço"
          className={styles.inputField}
          mask="currency"
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
              <div className={styles.imageWrapper}>
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
            </div>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles.editMarketButton}
          >
            Salvar
          </Button>
          <Button
            onClick={onCancel}
            variant="outlined"
            color="primary"
            className={styles.editMarketButton}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditMarketForm;
