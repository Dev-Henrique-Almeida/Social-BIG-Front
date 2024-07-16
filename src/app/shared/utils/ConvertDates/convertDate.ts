const FormatDateToBRFull = (dateString: string): string => {
  const date = new Date(dateString);
  const day = (date.getDate() + 1).toString().padStart(2, "0");
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `Nascido em ${day} de ${month}, ${year}`;
};

export default FormatDateToBRFull;
