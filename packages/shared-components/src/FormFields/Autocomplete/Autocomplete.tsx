import type { AutocompleteProps as MuiAutocompleteProps } from "@mui/material";
import {
  InputLabel,
  Autocomplete as MuiAutocomplete,
  Stack,
  TextField,
} from "@mui/material";
import {
  type ControllerRenderProps,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";

export type AutocompleteProps<P extends FieldValues> = UseControllerProps<P> &
  Omit<
    Omit<
      MuiAutocompleteProps<
        {
          label: string;
          value: string;
        },
        boolean,
        boolean,
        boolean
      >,
      "renderInput"
    >,
    keyof ControllerRenderProps<P>
  > & {
    required?: boolean;
    label?: string;
    helperText?: string;
    error?: boolean;
    placeholder?: string;
  };

export function Autocomplete<P extends FieldValues>({
  control,
  defaultValue,
  disabled = false,
  name,
  required = false,
  label = "",
  multiple = false,
  options = [],
  rules,
  helperText,
  error,
  placeholder = "",
  ...restProps
}: AutocompleteProps<P>) {
  const {
    field: { onChange, value, ...restField },
  } = useController({ name, control, defaultValue, rules });

  const selectedValue = multiple
    ? options.filter((option) => value?.includes(option.value))
    : options.find((option) => option.value === value) || null;

  return (
    <Stack gap="10px">
      {label && (
        <InputLabel required={required} disabled={disabled}>
          {label}
        </InputLabel>
      )}

      <MuiAutocomplete
        disabled={disabled}
        {...restProps}
        {...restField}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder || `Select ${label}`}
            error={error}
            helperText={helperText}
          />
        )}
        multiple={multiple}
        options={options}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }

          return option.label;
        }}
        value={selectedValue}
        onChange={(_, newValue) => {
          if (typeof newValue === "string") {
            return onChange(newValue ?? null);
          }

          if (Array.isArray(newValue)) {
            // eslint-disable-next-line sonarjs/function-return-type
            const values = newValue.map((option) => {
              if (typeof option === "string") {
                return newValue;
              }

              return option.value;
            });

            return onChange(values);
          }

          onChange(newValue ? newValue.value : null);
        }}
      />
    </Stack>
  );
}
