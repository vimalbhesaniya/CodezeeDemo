import {
  Popover as MuiPopover,
  useTheme,
  type PopoverProps,
} from "@mui/material";
import type { PropsWithChildren } from "react";

export const Popover = ({
  open,
  anchorEl,
  onClose,
  children,
}: PropsWithChildren<PopoverProps>) => {
  const theme = useTheme();

  return (
    <MuiPopover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          background: theme.palette.app.color.mirage[900],
          width: "200px",
        },
      }}
    >
      {children}
    </MuiPopover>
  );
};
