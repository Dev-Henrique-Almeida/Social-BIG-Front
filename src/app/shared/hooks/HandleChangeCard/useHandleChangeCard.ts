"use client";
import { useState } from "react";

const useHandleChange = <T extends Object>(initialData: T) => {
  const [formData, setFormData] = useState<T>(initialData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
