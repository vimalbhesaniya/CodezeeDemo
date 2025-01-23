import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import type { FormType } from "../../types/form";
import Step1 from "./Steps/Step1";

const CreateUser = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      firstname: "",
    },
  });

  return (
    <Stack>
      <form action="">
        <Step1 control={control} errors={errors} />
      </form>
    </Stack>
  );
};

export default CreateUser;
