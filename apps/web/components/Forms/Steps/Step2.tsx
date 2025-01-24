import { Stack } from "@mui/material";
import { TextField } from "@repo/shared-components";
import { Step } from "../../../types/Step";


function Step2({ control, errors }: Step) {
    return (
        <>
            <Stack gap={2}>
                <TextField fullWidth label={'Email'} name="email" control={control} helperText={errors.email?.message} />
                <TextField fullWidth label={'User Name'} name="username" control={control} helperText={errors.username?.message} />
            </Stack>
        </>
    );
}

export default Step2;
