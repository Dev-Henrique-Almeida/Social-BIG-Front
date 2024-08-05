"use client";
import React from "react";
import { Button } from "@mui/material";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";
import styles from "./formCreateCard.module.scss";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import InputField from "../../Profile/inputField/inputField";
import { IFormCreateCardProps, IMarketCreateData } from "@/app/shared/@types";
import { createMarket } from "@/app/shared/services";
import useHandleChange from "@/app/shared/hooks/HandleChangeCard/useHandleChangeCard";

interface FormCreateCardProps extends IFormCreateCardProps {
  refreshMarket: () => void;
}

const FormCreateCard: React.FC<FormCreateCardProps> = ({
  onClose,
  refreshMarket,
}) => {
  const themeStyles = useThemeStyles();
  const { user, token } = useAuthContext();

  const initialFormData: IMarketCreateData = {
    sellerId: user!.id!,
    price: 0,
    name: "",
    description: "",
    image: "",
  };

  const { formData, handleChange } =
    useHandleChange<IMarketCreateData>(initialFormData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedFormData = {
      ...formData,
      price: parseFloat(formData.price.toString()),
    };

    try {
      const newCard = await createMarket(formattedFormData, token!);
      console.log("Novo Card:", newCard); // Adicionado para depuração
      alert("Card criado com sucesso!");
      refreshMarket();
      onClose && onClose();
    } catch (error) {
      console.error("Erro ao criar card:", error);
      alert("Erro ao criar card. Verifique o console para mais detalhes.");
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
          value={formData.description}
          onChange={handleChange}
          name="description"
          placeholder="Descrição"
          className={styles.inputField}
        />
        <InputField
          type="number"
          value={formData.price.toString()}
          onChange={handleChange}
          name="price"
          placeholder="Preço"
          className={styles.inputField}
        />
        <InputField
          type="text"
          value={formData.image || ""}
          onChange={handleChange}
          name="image"
          placeholder="URL da Imagem (opcional)"
          className={styles.inputField}
        />
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
