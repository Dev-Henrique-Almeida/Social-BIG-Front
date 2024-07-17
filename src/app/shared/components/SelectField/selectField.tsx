import React from "react";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import { IInputFieldProps } from "../../@types";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";

interface ISelectFieldProps extends IInputFieldProps {
  options: { value: string; label: string }[];
  helperText?: string;
}

const SelectField: React.FC<ISelectFieldProps> = ({
  value,
  onChange,
  name,
  placeholder,
  className,
  options,
  helperText,
}) => {
  const themeStyles = useThemeStyles();

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange({
      target: {
        name: event.target.name,
        value: event.target.value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <FormControl
      fullWidth
      className={className}
      style={{
        backgroundColor: themeStyles.backgroundPaper,
        color: themeStyles.textColor,
      }}
    >
      <InputLabel>{placeholder}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        name={name}
        style={{
          backgroundColor: themeStyles.backgroundPaper,
          color: themeStyles.textColor,
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
