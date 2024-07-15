import { useState } from "react";
import {
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IInputFieldProps } from "../../@types";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";

const InputField: React.FC<IInputFieldProps> = ({
  type,
  value,
  onChange,
  name,
  placeholder,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const themeStyles = useThemeStyles();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl fullWidth className={className} variant="outlined">
      <InputLabel>{placeholder}</InputLabel>
      <OutlinedInput
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        name={name}
        style={{
          backgroundColor: themeStyles.backgroundPaper,
          color: themeStyles.textColor,
        }}
        endAdornment={
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined
        }
      />
    </FormControl>
  );
};

export default InputField;
