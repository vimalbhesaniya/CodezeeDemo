import {
  ListItemButton,
  ListItemText,
  Stack,
  useTheme,
  type ListItemButtonProps,
} from "@mui/material";
import type { ReactNode } from "react";
import { Bullet } from "./Drawer.styled";

export type MenuItemProps = ListItemButtonProps & {
  icon?: ReactNode;
  endAdornment?: ReactNode;
};

export const MenuItem = ({
  selected = false,
  icon = <Bullet />,
  title,
  endAdornment,
  ...props
}: MenuItemProps) => {
  const theme = useTheme();

  return (
    <ListItemButton
      {...props}
      sx={{
        color: selected ? theme.palette.app.color.iron[600] : "primary.light",
        ":hover": {
          color: theme.palette.app.color.iron[600],
        },
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        flex={1}
        gap="10px"
        justifyContent="center"
      >
        {icon}
        {title && <ListItemText primary={title} />}
      </Stack>
      {endAdornment}
    </ListItemButton>
  );
};
