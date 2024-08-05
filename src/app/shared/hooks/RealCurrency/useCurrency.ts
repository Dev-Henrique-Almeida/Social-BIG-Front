import { useCallback } from "react";

const useCurrency = () => {
  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }, []);

  return { formatCurrency };
};

export default useCurrency;
