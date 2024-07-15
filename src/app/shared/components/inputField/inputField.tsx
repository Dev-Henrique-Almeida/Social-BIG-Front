import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputMask from "react-input-mask";
import { IInputFieldProps } from "../../@types";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";

interface InputFieldProps extends IInputFieldProps {
  mask?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  onChange,
  name,
  placeholder,
  className,
  mask,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const themeStyles = useThemeStyles();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const inputElement = (
    <TextField
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      className={className}
      style={{
        backgroundColor: themeStyles.backgroundPaper,
        color: themeStyles.textColor,
      }}
      fullWidth
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );

  return mask ? (
    <InputMask mask={mask} value={value} onChange={onChange}>
      {inputElement}
    </InputMask>
  ) : (
    inputElement
  );
};

export default InputField;
