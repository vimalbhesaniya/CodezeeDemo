import { Stack } from "@mui/material";
import { PasswordField, TextField } from "@repo/shared-components";
import { Step } from "../../../types/Step";


function Step3({ control, errors }: Step) {
    return (
        <>
            <Stack gap={2}>
                <TextField fullWidth label={'Street'} error={!!errors.street?.message} name="street" control={control} helperText={errors.street?.message} />
                <TextField fullWidth label={'Country'} name="country" error={!!errors.country?.message} control={control} helperText={errors.country?.message} />
                <TextField fullWidth label={'State'} name="state" error={!!errors.state?.message} control={control} helperText={errors.state?.message} />
                <TextField fullWidth label={'Pincode'} name="pincode" error={!!errors.pincode?.message} control={control} helperText={errors.pincode?.message} />
            </Stack>
        </>
    );
}

export default Step3;
