import {
  InputLabel,
  TextField as MuiTextField,
  Stack,
  type TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import {
  useController,
  type ControllerRenderProps,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

export type TextFieldProps<P extends FieldValues> = UseControllerProps<P> &
  Omit<MuiTextFieldProps, keyof ControllerRenderProps<P>> & {
    label?: string;
  };

export function TextField<P extends FieldValues>({
  control,
  name,
  defaultValue,
  label = "",
  rules,
  type,
  required,
  disabled,
  placeholder = "",
  ...inputFieldProps
}: TextFieldProps<P>) {
  const {
    field: { onChange, ...restField },
  } = useController({ name, control, defaultValue, rules });

  return (
    <Stack gap="10px">
      {label && (
        <InputLabel required={required} disabled={disabled}>
          {label}
        </InputLabel>
      )}

      <MuiTextField
        disabled={disabled}
        required={required}
        fullWidth
        placeholder={placeholder || label}
        type={type}
        onChange={(event) => {
          const value = event.target.value || null;

          if (value && type === "number") {
            onChange(Number(value));
          } else {
            onChange(value);
          }
        }}
        {...restField}
        {...inputFieldProps}
      />
    </Stack>
  );
}
