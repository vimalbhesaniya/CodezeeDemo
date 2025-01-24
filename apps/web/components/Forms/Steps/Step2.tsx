import { Stack } from "@mui/material";
import { PasswordField, TextField } from "@repo/shared-components";
import { Step } from "../../../types/Step";


function Step2({ control, errors }: Step) {
    return (
        <>
            <Stack gap={2}>
                <TextField fullWidth label={'Email'} error={!!errors.email?.message} name="email" control={control} helperText={errors.email?.message} />
                <TextField fullWidth label={'User Name'} name="username" error={!!errors.username?.message} control={control} helperText={errors.username?.message} />
                <PasswordField fullWidth label={'Password'} name="password" error={!!errors.password?.message} control={control} helperText={errors.password?.message} />
                <PasswordField fullWidth label={'Confirm Password'} name="confirmPassword" error={!!errors.confirmPassword?.message} control={control} helperText={errors.confirmPassword?.message} />
            </Stack>
        </>
    );
}

export default Step2;
