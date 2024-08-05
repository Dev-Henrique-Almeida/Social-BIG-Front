import { useState, ChangeEvent } from "react";

const useHandleChange = <T>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return {
    formData,
    handleChange,
    setFormData,
  };
};

export default useHandleChange;
