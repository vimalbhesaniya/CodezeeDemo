import { Stack } from "@mui/material";
import { Checkbox } from "@repo/shared-components";
import { Step } from "../../../types/Step";


function Step4({ control, errors }: Step) {
    return (
        <>
            <Stack gap={2}>
                <Checkbox
                    control={control}
                    name="hobbies"
                    label="Hobbies"
                    helperText={errors.hobbies?.message} options={[{
                        label: "Gaming",
                        value: "Gaming"
                    }, {
                        label: "Playing",
                        value: "Playing"
                    }, {
                        label: "Coding",
                        value: "Coding"
                    }]}
                    error={!!errors.hobbies?.message} />
            </Stack>
        </>
    );
}

export default Step4;
