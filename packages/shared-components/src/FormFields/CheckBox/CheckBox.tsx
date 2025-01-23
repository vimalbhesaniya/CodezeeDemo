import Checkbox, {
  type CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";
import {
  useController,
  type ControllerRenderProps,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { BoxStyled, CheckStyled } from "./CheckBox.styled";

export type CheckBoxProps<P extends FieldValues> = UseControllerProps<P> &
  Omit<Omit<MuiCheckboxProps, "checked">, keyof ControllerRenderProps<P>>;

export function CheckBox<P extends FieldValues>({
  name,
  rules,
  control,
  defaultValue,
  size,
  ...restCheckBoxProps
}: CheckBoxProps<P>) {
  const {
    field: { value, ...restField },
  } = useController({ name, control, defaultValue, rules });

  return (
    <Checkbox
      icon={<BoxStyled size={size} />}
      checkedIcon={<CheckStyled size={size} />}
      checked={value}
      {...restField}
      {...restCheckBoxProps}
    />
  );
}
