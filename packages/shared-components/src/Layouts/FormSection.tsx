import { Stack, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";
import { PadBox } from "../PadBox";

export const FormSection = ({
  title,
  children,
}: PropsWithChildren<{ title?: string }>) => {
  return (
    <Stack gap="20px">
      {title && (
        <Typography fontWeight={700} variant="h5">
          {title}
        </Typography>
      )}

      <PadBox padding={{ padding: "20px" }}>
        <Stack gap="20px">{children}</Stack>
      </PadBox>
    </Stack>
  );
};
