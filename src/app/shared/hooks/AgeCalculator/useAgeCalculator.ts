import { useCallback } from "react";

const useAgeCalculator = () => {
  const calculateAge = useCallback((birthdate: string | Date) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }, []);

  return { calculateAge };
};

export default useAgeCalculator;
