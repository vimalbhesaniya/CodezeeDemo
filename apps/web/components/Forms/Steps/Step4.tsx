import { Stack } from "@mui/material";
import { Checkbox } from "@repo/shared-components";
import type { Step } from "../../../types/Step";


function Step4({ control, errors, checked }: Step) {
    return (
        <Stack gap={2}>
                <Checkbox
                checked={checked}
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
    );
}

export default Step4;
