const FormatBirthdate = (birthdate: string | undefined): string => {
  if (birthdate) {
    return new Date(birthdate).toISOString().split("T")[0];
  }
  return "";
};

export default FormatBirthdate;
