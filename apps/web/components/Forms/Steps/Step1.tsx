import { Stack } from "@mui/material";
import { TextField } from "@repo/shared-components";
import { Step } from "../../../types/Step";

function Step1({ control,errors  }: Step) {
  return (
    <>
      <Stack gap={2}>
        <TextField fullWidth label={'First Name'} error={!!errors.firstname?.message} name="firstname" control={control} helperText={errors.firstname?.message} />
        <TextField fullWidth label={'Last Name'} error={!!errors.lastname?.message} name="lastname" control={control} helperText={errors.lastname?.message} />
      </Stack>
    </>
  );
}

export default Step1;
