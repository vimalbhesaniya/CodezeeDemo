import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { type FieldValues } from "react-hook-form";
import { TextField, type TextFieldProps } from "../TextField";

type PasswordFieldProps<P extends FieldValues> = Readonly<
  Omit<TextFieldProps<P>, "InputProps">
>;

export function PasswordField<P extends FieldValues>(
  props: PasswordFieldProps<P>
) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <TextField
      type={isPasswordVisible ? "text" : "password"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockOutlined fontSize="small" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePasswordVisibility}
              edge="end"
            >
              {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}
