"use client";
import { useState } from "react";
import { IEventProps } from "../../@types";

const useHandleChange = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = ({ target }: IEventProps) => {
    const { name, value } = target;
    setFormData((prev) => {
      const newState = { ...prev, [name]: value };
      return newState;
    });
  };

  return {
    formData,
    handleChange,
  };
};

export default useHandleChange;
