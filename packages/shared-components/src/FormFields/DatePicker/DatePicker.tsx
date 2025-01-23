import { InputLabel, Stack } from "@mui/material";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import type { UsePickerLayoutProps } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerLayoutProps";
import { DateTime } from "luxon";
import { useState } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export type DatePickerProps<P extends FieldValues> = UseControllerProps<P> &
  UsePickerLayoutProps &
  Partial<{
    label: string;
    required: boolean;
    disabled: boolean;
    format: string;
    error: boolean;
    helperText: string;
  }>;

export const dateFormats = {
  dateWithISO8601: "yyyy-MM-dd",
  dateWithEuropean: "dd-MM-yyyy",
};

export function DatePicker<P extends FieldValues>({
  control,
  defaultValue,
  disabled = false,
  label,
  readOnly = false,
  name,
  error = false,
  helperText,
  required = false,
  rules,
  format = dateFormats.dateWithEuropean,
  ...restProps
}: DatePickerProps<P>) {
  const {
    field: { value, onChange, ...restField },
  } = useController({ name, control, defaultValue, rules });

  const [open, setOpen] = useState(false);

  const finalValue =
    value && typeof value === "string"
      ? //TODO: jaydip, fix this type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (DateTime.fromISO(value) as any)
      : null;

  return (
    <Stack gap="10px">
      <InputLabel required={required} disabled={disabled}>
        {label}
      </InputLabel>

      <MuiDatePicker
        {...restField}
        {...restProps}
        disabled={disabled}
        format={format}
        value={finalValue}
        readOnly={readOnly}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        slotProps={{
          field: { clearable: true },
          textField: {
            disabled: disabled,
            onClick: () => {
              if (readOnly || disabled) {
                setOpen(false);
              } else {
                setOpen(true);
              }
            },
            helperText: helperText,
            error: error,
          },
        }}
        //TODO: jaydip, fix this type issue
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(value: any) => {
          if (value) {
            onChange(value.toFormat(dateFormats.dateWithISO8601));
          }
        }}
      />
    </Stack>
  );
}
