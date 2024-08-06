import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import { IInputFieldProps } from "@/app/shared/@types";

const InputField: React.FC<IInputFieldProps> = ({
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 0) {
      val = val.replace(/^(\d{2})(\d)/g, "($1) $2");
    }
    if (val.length > 9) {
      val = val.replace(/(\d{5})(\d{4})$/, "$1-$2");
    }
    e.target.value = val;
    onChange(e);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    val = (parseInt(val, 10) / 100).toFixed(2).toString();
    val = val.replace(".", ",");
    val = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    e.target.value = "R$ " + val;
    onChange(e);
  };

  return (
    <FormControl fullWidth className={className} variant="outlined">
      <InputLabel shrink /* ={type === "date" || undefined} */>
        {placeholder}
      </InputLabel>
      <OutlinedInput
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        onInput={
          type === "tel"
            ? handlePhoneChange
            : mask === "currency"
            ? handleCurrencyChange
            : onChange
        }
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
