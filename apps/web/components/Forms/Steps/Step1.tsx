import { Stack } from "@mui/material";
import { RadioGroupField, TextField } from "@repo/shared-components";
import { Step } from "../../../types/Step";


function Step1({ control,errors  }: Step) {
  return (
    <>
      <Stack gap={2}>
        <TextField fullWidth label={'First Name'} error={!!errors.firstname?.message} name="firstname" control={control} helperText={errors.firstname?.message} />
        <TextField fullWidth label={'Last Name'} error={!!errors.lastname?.message} name="lastname" control={control} helperText={errors.lastname?.message} />
        <RadioGroupField
          label="Gender"
          name="gender"
          control={control}
          options={[{
            disabled: false,
            label: "Male",
            values: "male"
          }, {
            disabled: false,
            label: "Female",
            values: "famale"
          },
          {
            disabled: false,
            label: "Other",
            values: 'other'
          }]}
          
        />
      </Stack>
    </>
  );
}

export default Step1;
