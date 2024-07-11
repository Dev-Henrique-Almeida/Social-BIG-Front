"use client";
import { useState } from "react";
import { IEventProps, IUserData } from "../../@types";

const useHandleChange = (initialData: Partial<IUserData> = {}) => {
  const [formData, setFormData] = useState<IUserData>({
    id: "",
    name: "",
    username: "",
    email: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
    image: "",
    sex: "",
    address: "",
    phone: "",
    occupation: "",
    ...initialData,
  });

  const handleChange = ({ target }: IEventProps) => {
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    formData,
    handleChange,
  };
};

export default useHandleChange;
