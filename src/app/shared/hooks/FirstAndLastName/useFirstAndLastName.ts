const useFirstAndLastName = (fullName: string): string => {
  const names = fullName.split(" ");
  if (names.length > 1) {
    return `${names[0]} ${names[names.length - 1]}`;
  } else {
    return fullName;
  }
};

export default useFirstAndLastName;
