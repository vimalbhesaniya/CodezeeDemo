import { Box, type SxProps } from "@mui/material";
import type { PropsWithChildren } from "react";

export const PadBox = ({
  children,
  padding,
}: PropsWithChildren<{ padding: SxProps }>) => {
  return (
    <Box
      sx={{ ...padding, height: "inherit", boxSizing: "border-box" }}
      id="pad-box"
    >
      {children}
    </Box>
  );
};
