import { Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { TextField } from "@repo/shared-components";
import type {
  Control,
  FieldErrors,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Step1Type<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
};

function Step1<T extends FieldValues | UseControllerProps>({
  control,
  errors,
}: Readonly<Step1Type<T>>) {
  return (
    <Stack>
      <Grid2>
        name={"firstname"}
        control={control}
        helperText={errors.firstname?.message}
        label={"hello"}
        />
      </Grid2>
    </Stack >
  );
}

export default Step1;
