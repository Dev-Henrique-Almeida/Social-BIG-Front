const ConvertSex = (sex: "Male" | "Female" | undefined): string => {
  if (sex === "Male") {
    return "Masculino";
  } else if (sex === "Female") {
    return "Feminino";
  } else {
    return "Não especificado";
  }
};

export default ConvertSex;
