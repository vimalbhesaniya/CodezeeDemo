import { FormControlLabel, InputLabel, RadioGroup, Stack } from "@mui/material";
import Radio, { type RadioProps as MuiRadioProps } from "@mui/material/Radio";
import {
  useController,
  type ControllerRenderProps,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Options = {
  values: boolean;
  label: string;
  disabled: boolean;
};

export type RadioGroupFieldProps<P extends FieldValues> =
  UseControllerProps<P> &
    Omit<Omit<MuiRadioProps, "checked">, keyof ControllerRenderProps<P>> & {
      label: string;
      options: Options[];
    };

export function RadioGroupField<P extends FieldValues>({
  name,
  rules,
  label,
  control,
  options,
  defaultValue,
  size = "small",
  color = "secondary",
  ...restRadioButtonProps
}: RadioGroupFieldProps<P>) {
  const {
    field: { value, onChange, ...restField },
  } = useController({ name, control, defaultValue, rules });

  return (
    <Stack gap="5px">
      {label && <InputLabel>{label}</InputLabel>}

      <RadioGroup
        name={name}
        value={value}
        onChange={(_, event) => {
          onChange(event === "true" ? true : false);
        }}
      >
        <Stack gap="45px" direction="row">
          {options?.map(({ label, values, disabled }) => {
            return (
              <FormControlLabel
                value={values}
                control={
                  <Radio
                    {...restField}
                    {...restRadioButtonProps}
                    color={color}
                    size={size}
                  />
                }
                disabled={disabled}
                label={label}
                key={self.crypto.randomUUID()}
              />
            );
          })}
        </Stack>
      </RadioGroup>
    </Stack>
  );
}
