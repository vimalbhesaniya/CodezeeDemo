// import Checkbox, {
//   type CheckboxProps as MuiCheckboxProps,
// } from "@mui/material/Checkbox";
// import {
//   useController,
//   type ControllerRenderProps,
//   type FieldValues,
//   type UseControllerProps,
// } from "react-hook-form";
// import { BoxStyled, CheckStyled } from "./CheckBox.styled";

// export type CheckBoxProps<P extends FieldValues> = UseControllerProps<P> &
//   Omit<Omit<MuiCheckboxProps, "checked">, keyof ControllerRenderProps<P>>;

// export function CheckBox<P extends FieldValues>({
//   name,
//   rules,
//   control,
//   defaultValue,
//   size,
//   ...restCheckBoxProps
// }: CheckBoxProps<P>) {
//   const {
//     field: { value, ...restField },
//   } = useController({ name, control, defaultValue, rules });

//   return (
//     <Checkbox
//       icon={<BoxStyled size={size} />}
//       checkedIcon={<CheckStyled size={size} />}
//       checked={value}
//       {...restField}
//       {...restCheckBoxProps}
//     />
//   );
// }




// import { FormControlLabel, FormHelperText, Stack } from "@mui/material";
// import Checkbox, {
//   type CheckboxProps as MuiCheckboxProps,
// } from "@mui/material/Checkbox";
// import {
//   useController,
//   useWatch,
//   type ControllerRenderProps,
//   type FieldValues,
//   type UseControllerProps,
// } from "react-hook-form";
// import { BoxStyled, CheckStyled } from "./CheckBox.styled";

// type Option = {
//   value: string;
//   label: string;
// };

// export type CheckBoxProps<P extends FieldValues> = UseControllerProps<P> &
//   Omit<Omit<MuiCheckboxProps, "checked">, keyof ControllerRenderProps<P>> & {
//     label?: string;
//     options: Option[];
//     error: boolean;
//     helperText: string
//   };

// export function CheckBox<P extends FieldValues>({
//   name,
//   rules,
//   control,
//   defaultValue,
//   size,
//   label,
//   options,
//   error,
//   helperText
// }: CheckBoxProps<P>) {
//   const {
//     field: { onChange, ...restField },
//   } = useController({ name, control, defaultValue, rules });

//   const selectedValues: string[] = useWatch({ control, name }) || [];

//   const handleChange = (value: string) => {
//     const updatedValues = selectedValues.includes(value)
//       ? selectedValues.filter((v) => v !== value)
//       : [...selectedValues, value];

//     onChange(updatedValues);
//   };

//   return (
//     <Stack gap="5px">
//       {label && <span>{label}</span>}
//       <Stack gap="45px" direction="row">
//         {options.map((option) => (
//           <FormControlLabel
//             control={
//               <Checkbox
//                 icon={<BoxStyled size={size} />}
//                 checkedIcon={<CheckStyled size={size} />}
//                 checked={selectedValues.includes(option.value)}
//                 {...restField}
//                 value={option.value}
//                 onChange={() => handleChange(option.value)}
//               />
//             }
//             label={option.label}
//             key={option.value}
//           />
//         ))}
//       </Stack>
//       {error && helperText && (
//         <FormHelperText error>{helperText}</FormHelperText>
//       )}
//     </Stack>
//   );
// }




"use client";
import {
  Box,
  FormLabel,
  Checkbox as MuiCheckBox,
  Stack,
  Typography,
  type CheckboxProps as MuiCheckboxProps
} from "@mui/material";
import React from "react";
import { ControllerRenderProps, FieldValues, useController, UseControllerProps } from "react-hook-form";


type Option = {
  value: string;
  label: string;
};

type CheckBoxProps<T extends FieldValues> = UseControllerProps<T> & Omit<Omit<MuiCheckboxProps, 'checked'>, keyof ControllerRenderProps<T>> & {
  options: Option[],
  label: string,
  error: boolean;
  helperText: string | undefined
}
export function Checkbox<T extends FieldValues>({ helperText, name, options, label, control, defaultValue }: CheckBoxProps<T>) {
  const { field } = useController({
    name,
    control,
    defaultValue
  });
  const { value, onChange } = field;
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: selectedValue, checked } = event.target;
    if (checked) {
      onChange([...value, selectedValue]);
    } else {
      onChange(value.filter((v: string) => v !== selectedValue));
    }
  };

  return (
    <>
      <Stack direction={"column"}>
        {label && <Typography variant="subtitle1">{label}</Typography>}
        <Stack direction={'row'} mt={1} gap={2}>
          {
            options.map(({ label, value }) => {
              return <>
                <Stack direction={'row'} gap={1}>

                  <MuiCheckBox
                    {...field}
                    id={value}
                    onChange={handleCheckboxChange}
                    value={value}
                  />
                  <FormLabel htmlFor={value}>{label}</FormLabel>
                </Stack>
              </>
            })
          }
        </Stack>
        {helperText && <Typography variant="caption" mt={1} color={'red'}>{helperText}</Typography>}
      </Stack>
    </>
  );
}