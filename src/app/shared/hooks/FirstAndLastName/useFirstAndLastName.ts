import { useMemo } from "react";

const useFirstAndLastName = (fullName: string): string => {
  const firstAndLastName = useMemo(() => {
    const names = fullName.split(" ");
    if (names.length > 1) {
      return `${names[0]} ${names[names.length - 1]}`;
    } else {
      return fullName;
    }
  }, [fullName]);

  return firstAndLastName;
};

export default useFirstAndLastName;
