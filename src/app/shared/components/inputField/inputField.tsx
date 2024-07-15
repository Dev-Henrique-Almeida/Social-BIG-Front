import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
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
};

export default InputField;
