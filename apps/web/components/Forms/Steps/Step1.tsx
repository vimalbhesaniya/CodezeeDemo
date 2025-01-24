import { Stack } from "@mui/material";
import { TextField, TextFieldProps } from "@repo/shared-components";
import { FieldErrors } from "react-hook-form";
import { FormType } from "../../../types/form";

function Step1({ control, errors }: Pick<TextFieldProps<FormType>, "control"> & { errors: FieldErrors<FormType> }) {
  return (
    <>
      <Stack gap={2}>
        <TextField fullWidth label={'First Name'} name="firstname" control={control} helperText={errors.firstname?.message} />
        <TextField fullWidth label={'Last Name'} name="lastname" control={control} helperText={errors.lastname?.message} />
      </Stack>
    </>
  );
}

export default Step1;
