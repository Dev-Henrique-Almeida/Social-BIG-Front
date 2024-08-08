"use client";
import React, { useState, useRef } from "react";
import { Button, Alert } from "@mui/material";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";
import styles from "./formCreateCard.module.scss";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import InputField from "../../Profile/inputField/inputField";
import { IFormCreateCardProps, IMarketCreateData } from "@/app/shared/@types";
import { createMarket } from "@/app/shared/services";
import useHandleChange from "@/app/shared/hooks/HandleChangeCard/useHandleChangeCard";
import { Close } from "@mui/icons-material";
import useCurrency from "@/app/shared/hooks/RealCurrency/useCurrency";

interface FormCreateCardProps extends IFormCreateCardProps {
  refreshMarket: () => void;
}

const FormCreateCard: React.FC<FormCreateCardProps> = ({
  onClose,
  refreshMarket,
}) => {
  const themeStyles = useThemeStyles();
  const { user, token } = useAuthContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const initialFormData: IMarketCreateData = {
    sellerId: user!.id!,
    price: 0,
    name: "",
    description: "",
    image: "",
  };

  const { formData, handleChange, setFormData } =
    useHandleChange<IMarketCreateData>(initialFormData);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const { formatCurrency } = useCurrency();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.name.length > 45) {
      setNameError("O título deve ter no máximo 45 caracteres.");
      return;
    }

    const formattedFormData = {
      ...formData,
      price: parseFloat(
        formData.price
          .toString()
          .replace("R$", "")
          .replace(".", "")
          .replace(",", ".")
      ),
    };

    try {
      const newCard = await createMarket(formattedFormData, token!);
      console.log("Novo Card:", newCard);
      alert("Card criado com sucesso!");
      refreshMarket();
      onClose && onClose();
    } catch (error) {
      console.error("Erro ao criar card:", error);
      alert("Erro ao criar card. Verifique os dados, e tente novamente!");
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
    <div className={styles.formCreateCardContainer}>
      <form
        onSubmit={handleSubmit}
        className={styles.formCreateCardForm}
        style={{ backgroundColor: themeStyles.backgroundPaper }}
      >
        <div className={styles.header}>
          <h1
            className={styles.formCreateCardTitle}
            style={{ color: themeStyles.textColor }}
          >
            Criar Card
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
            className={styles.formCreateCardButton}
          >
            Salvar
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            color="primary"
            className={styles.formCreateCardButton}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormCreateCard;
